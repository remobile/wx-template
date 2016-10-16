const CONSTANTS = require('./config/Constants.js');
const Route = require('./config/Route.js');
const GET = require('./utils/net/get.js');
const PersonalMgr = require('./manager/PersonalMgr.js');

App({
    data: {},
    CONSTANTS: CONSTANTS,
    GET: GET,
    route: Route,
    personal:new PersonalMgr(),
    Page(...params) {
        let data = {};
        let options = {};
        params.forEach((v)=>{
            Object.assign(options, v);
            Object.assign(data, v.data);
        });
        if (!options.tabbar) {
            const {onLoad, onUnload} = options;
            options.onLoad = function() {
                var app = getApp();
                this.props = app.passProps;
                app.navigator.routeStack.push(this);
                onLoad && onLoad.bind(this)();
            };
            options.onUnload = function() {
                var app = getApp();
                onUnload && onUnload.bind(this)();
                app.navigator.routeStack.pop();
            };
        } else {
            const {onShow, onLoad} = options;
            options.onLoad = function() {
                var app = getApp();
                app.navigator.tabbarRouteStack.push(this);
                onLoad && onLoad.bind(this)();
            };
            options.onShow = function() {
                var app = getApp();
                app.navigator.routeStack[0] = this;
                onShow && onShow.bind(this)();
            };
        }
        return Page(options);
    },
    navigator: {
        routeStack: [],
        tabbarRouteStack: [],
        push(obj) {
            getApp().passProps = obj.passProps;
            wx.navigateTo({url: obj.url});
        },
        replace() {
            getApp().passProps = obj.passProps;
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
    },
})
