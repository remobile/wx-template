var {EventEmitter} = require('thirdparty/fbemitter/index.js');
const moment = require('./thirdparty/moment/moment.js');
const utils = require('./utils/common/index.js');
Object.assign(global, {
    Array,
    Date,
    Error,
    Function,
    Math,
    Object,
    Number,
    RegExp,
    String,
    TypeError,
    EventEmitter,
    moment,
    utils,
});
global._ = require('./thirdparty/lodash/lodash.js');

const CONSTANTS = require('./config/Constants.js');
const Route = require('./config/Route.js');
const GET = require('./utils/net/get.js');
const PersonalMgr = require('./manager/PersonalMgr.js');

App({
    appName: '糗事百科',
    data: {},
    CONSTANTS: CONSTANTS,
    GET: GET,
    route: Route,
    Page(...params) {
        let data = {};
        let options = {
            showWaiting() {
                this.setData({loading: true});
            },
            hideWaiting() {
                this.setData({loading: false});
            },
            toast(text, duration=3000) {
                this.setData({toastIsShowing: true, toastText: text});
                setTimeout(()=>{
                    this.setData({toastIsShowing: false});
                }, duration)
            },
        };
        params.forEach((v)=>{
            Object.assign(options, v);
            Object.assign(data, v.data);
        });
        options.data = data;

        if (!options.tabbar) {
            const {onLoad, onReady, onShow, onUnload} = options;
            options.onLoad = function() {
                var app = getApp();
                this.setData({
                    sw: app.system.windowWidth,
                    sh: app.system.windowHeight,
                });
                this.props = app.passProps||{};
                app.navigator.routeStack.push(this);
                onLoad && onLoad.bind(this)();
            };
            options.onReady = function() {
                var app = getApp();
                this.shownTitle = app.passTitle || options.title || app.appName;
                wx.setNavigationBarTitle({title: this.shownTitle});
                onReady && onReady.bind(this)();
            };
            options.onShow = function() {
                if (this.shownTitle) {
                    wx.setNavigationBarTitle({title: this.shownTitle});
                }
                onShow && onShow.bind(this)();
            };
            options.onUnload = function() {
                var app = getApp();
                onUnload && onUnload.bind(this)();
                app.navigator.routeStack.pop();
            };
        } else {
            const {onLoad, onReady, onShow} = options;
            options.onLoad = function() {
                var app = getApp();
                app.navigator.tabbarRouteStack.push(this);
                onLoad && onLoad.bind(this)();
            };
            options.onReady = function() {
                this.shownTitle = options.title || getApp().appName;
                wx.setNavigationBarTitle({title: this.shownTitle});
                onReady && onReady.bind(this)();
            };
            options.onShow = function() {
                var app = getApp();
                this.setData({
                    sw: app.system.windowWidth,
                    sh: app.system.windowHeight,
                });
                app.navigator.routeStack[0] = this;
                if (this.shownTitle) {
                    wx.setNavigationBarTitle({title: this.shownTitle});
                }
                onShow && onShow.bind(this)();
            };
        }
        // console.log("options:", options);
        Page(options);
    },
    navigator: {
        routeStack: [],
        tabbarRouteStack: [],
        push(obj) {
            getApp().passProps = obj.passProps;
            getApp().passTitle = obj.title;
            wx.navigateTo({url: obj.url});
        },
        replace() {
            getApp().passProps = obj.passProps;
            getApp().passTitle = obj.title;
            wx.redirectTo({url: obj.url});
        },
        pop() {
            wx.navigateBack();
        },
        getRoutes() {
            return this.routeStack;
        },
        getCurrentRoute() {
            return this.routeStack[this.routeStack.length-1];
        },
        getParentRoute(i=1) {
            return this.routeStack[this.routeStack.length-1-i];
        },
        getTabbarRoute(name) {
            for (var i in this.tabbarRouteStack) {
                if (this.tabbarRouteStack[i].tabbar === name) {
                    return this.tabbarRouteStack[i];
                }
            }
        },
    },
    onLaunch() {
        wx.getSystemInfo({
            success: (res) => {
                this.system = res;
            }
        })
        this.personal = new PersonalMgr();
        this.personal.login();
    },
})
