import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../components/login/LoginView.vue')
  },
  {
    path: '/school/login',
    redirect: '/'
  },
  {
    path: '/school/room',
    name: "room",
    component: () => import(/* webpackChunkName: "room" */ '../views/room/RoomView.vue')

  },

  {
    path: '/school/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../components/home/HomeView.vue'),
    children: [
      {
        path: '/', // 子路由的默认路径
        redirect: 'index',
      },
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "index" */ '../views/home/index/IndexView.vue')
      },
      {
        path: 'reservation',
        component: () => import(/* webpackChunkName: "my" */ '../views/home/reservation/ReservationView.vue')
      },
      {
        path: 'record',
        component: () => import(/* webpackChunkName: "my" */ '../views/home/record/RecordView.vue')
      },
      {
        path: 'my',
        component: () => import(/* webpackChunkName: "my" */ '../views/home/my/MyView.vue'),

      },
    ]
  },
  {
    path: '/school/roomDetail',
    name: "roomDetail",
    component: () => import(/* webpackChunkName: "roomDetail" */ '../views/roomDetail/RoomDetail.vue')
  }, {
    path: '/school/set',
    component: () => import(/* webpackChunkName: "set" */ '../views/set/SetView.vue'),
  }, {
    path: '/school/feedback',
    component: () => import(/* webpackChunkName: "feedback" */ '../views/feedback/FeedbackView.vue'),

  }, {
    path: '/school/feedback/my',
    component: () => import(/* webpackChunkName: "feedback/my" */ '../views/feedback/FeedbackMyView.vue'),
  },
  {
    path: '/school/feedback/feedbackDetail',
    component: () => import(/* webpackChunkName: "feedback/feedbackDetail" */ '../views/feedback/FeedbackDetail.vue'),
  },
  
  {
    path: '/school/record/recordDetail',
    component: () => import(/* webpackChunkName: "record/recordDetail" */ '../views/home/record/RecordDetail.vue'),
  },
  {
    path: '/school/allFacility',
    component: () => import(/* webpackChunkName: "allFacility" */ '../views/allFacility/AllFacilityView.vue'),
  },{
    path: '/school/map',
    component: () => import(/* webpackChunkName: "map" */ '../views/map/MapView.vue'),
  },{
    path: '/school/scanner',
    component: () => import(/* webpackChunkName: "scanner" */ '../views/scanner/ScannerView.vue'),
  },{
    path:"/school/reservation/reservationResult",
    component:()=>import(/* webpackChunkName: "reservation/reservationResult" */ '../views/roomDetail/ReservationResult.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
