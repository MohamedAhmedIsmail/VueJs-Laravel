<script>
import simplebar from "simplebar-vue";
import { layoutComputed } from "@/state/helpers";
import {mapActions} from 'vuex';
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...layoutComputed,
    notifications: {
        get() { return this.$store.state.notifications; },
        set(value) { this.$parent.$emit("ReadNotification", value) },
    },
    currentRouteName() {
        return this.$route.name;
    },
    logo_url(){
      // return window.location.origin + '/storage/tenants/app_setting/logo/logo.png';
    }
  },
  components: {simplebar},
  data() {
    return {
      layoutColor: 'white',
      userName: '',
    };
  },
  methods: {
    switchLayout(layoutColor){
      let that = this;
      that.$swal.fire({
          text: "سيتم إعادة تحميل هذه الصفحة ، يرجى حفظ جميع البيانات الخاصة بك",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#ff3d60',
          confirmButtonColor: '#f46a6a',
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
      }).then((result) => {
          if (result.isConfirmed) {
              localStorage.setItem('layoutColor', layoutColor);
              location.reload();
          }
      })
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    toggleMenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    ...mapActions({
        signOut:"auth/logout"
    }),
    async logout(){
        await this.axios.post('/logout').then(({data})=>{
            this.signOut()
            this.$router.push({name:"login"})
        })
    },


    checkIfAnyNotReededMSG(data){
      let flag = false
      for (let index = 0; index < data.length; index++) {
        if (data[index].seen == 0) {
          flag = true;
          break;
        }
      }
      return flag;
    },


  },
  created() {
    this.layoutColor = localStorage.getItem('layoutColor');
    this.userName = this.$store.state.auth.user.name;
  },


  watch: {
    type: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "dark":
              document.body.setAttribute("data-topbar", "dark");
              break;
            case "light":
              document.body.setAttribute("data-topbar", "light");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            case "colored":
              document.body.setAttribute("data-topbar", "colored");
              document.body.removeAttribute("data-layout-size", "boxed");
              break;
            default:
              document.body.setAttribute("data-topbar", "dark");
              break;
          }
        }
      },
    },
    width: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          switch (newVal) {
            case "boxed":
              document.body.setAttribute("data-layout-size", "boxed");
              break;
            case "fluid":
              document.body.setAttribute("data-layout-mode", "fluid");
              document.body.removeAttribute("data-layout-size");
              break;
            default:
              document.body.setAttribute("data-layout-mode", "fluid");
              break;
          }
        }
      },
    },
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img :src="logo_url" height="22" >
            </span>
            <span class="logo-lg">
<!--              <img :src="logo_url" alt height="35" />-->
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
<!--              <img :src="logo_url"  alt height="22" />-->
            </span>
            <span class="logo-lg">
<!--              <img :src="logo_url"  alt height="35" />-->
            </span>
          </router-link>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-24 d-lg-none header-item"
          data-toggle="collapse"
          @click="toggleMenu"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>

      </div>

      <div class="d-flex">

        <div class="dropdown  d-lg-inline-block ml-1" v-if="layoutColor == 'dark'">
          <button
            type="button"
            title="وضع مشرق"
            class="btn header-item noti-icon waves-effect"
            @click="switchLayout('white')"
          >
             <i class="ri-sun-line"></i>
          </button>
        </div>

        <div class="dropdown  d-lg-inline-block ml-1" v-if="layoutColor != 'dark'">
          <button
            title="وضع مظلم"
            type="button"
            class="btn header-item noti-icon waves-effect"
            @click="switchLayout('dark')"
          >
             <i class="ri-moon-fill"></i>
          </button>
        </div>

        <div class="dropdown  d-lg-inline-block ml-1">
          <button
            type="button"
            title="تكبير الشاشة"
            class="btn header-item noti-icon waves-effect"
            data-toggle="fullscreen"
            @click="initFullScreen"
          >
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>

        <!-- <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          variant="black"
          ref="notifications_dropdown"
        >
          <template v-slot:button-content>
            <i class="ri-notification-3-line"></i>
            <span v-if="notifications.notseen" class="noti-dot"></span>
          </template>
          <div class="p-3 border-bottom">
            <div class="row align-items-center">
              <div class="col-sm-3">
                <router-link :to="{ name: 'Notifications' }" class="small">
                  عرض الجميع
                </router-link>
              </div>
              <div class="col-sm-9">
                <h6 class="m-0">الاشعارات</h6>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px;">

            <a
              @click="handleRouteClick(notification)"
              v-for="notification in notifications.notifications" :key="notification.id"
              class="text-reset notification-item"
              >

              <div class="media border-bottom" :class="{ not_readed: notification.seen == 0}" @click="markAsRead(notification)">
                <div class="media-body">
                  <h6 class="mt-0 mb-1">{{ notification.notification_message }}</h6>
                  <div class="font-size-12 text-muted">

                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ notification.date }}
                    </p>
                  </div>
                </div>
              </div>
            </a>


          </simplebar>
        </b-dropdown> -->


        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          class="d-inline-block user-dropdown"
        >
          <template v-slot:button-content>
            <span class=" d-xl-inline-block ml-1">{{ userName }}</span>
            <i class="mdi mdi-chevron-down  d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <button type="button" class="dropdown-item text-danger"  @click="logout">
            <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
            تسجيل الخروج
          </button>
        </b-dropdown>


        <div class="dropdown d-inline-block">
          <button
          title="اعدادات التصميم"
            type="button"
            class="btn header-item noti-icon right-bar-toggle waves-effect toggle-right"
            @click="toggleRightSidebar"
          >
            <i class="ri-settings-2-line toggle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
