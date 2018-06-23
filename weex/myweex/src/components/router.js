import VueRouter from "vue-router"

import index from "index"
import car from "car"
import me from "me"

Vue.use(VueRouter);

exports default new VueRouter({
	routes: [
		{
			path: "/index",
			name: "index",
			component: index
		},
		{
			path: "/car",
			name: "car",
			component: car
		},
		{
			path: "/me",
			name: "me",
			component: me
		}
	]
});

