import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'

Vue.use(Router);
const RouterConfig={
	routes:routers
}
export const router=new Router(RouterConfig);

//路由过滤，验证登录和访问权限
router.beforeEach((to,from,next)=>{
	if(to.path=='/404'){
		next();
		return;
	}
	let user=JSON.parse(sessionStorage.getItem('user'));
	if(!user && to.meta.isLogin){
		next({path:'/login'});
	}else if(to.meta.isLogin && to.meta.isAuth){

		//权限验证，深入最多三级菜单判断
		let isAuth=false;
		user.menus.forEach(function(menu){
			if('/'+menu.path==to.path){
				isAuth=true;
			}
			menu.children.forEach(function(menu2){
				if('/'+menu2.path==to.path){
					isAuth=true;
				}
				menu2.children.forEach(function(menu3){
					if('/'+menu3.path==to.path){
						isAuth=true;
					}
				});
			});

		});
        if(isAuth){
        	next();
        }else{
        	next('/message');
        }		
	}else{
		next();
	}
})

