<script setup lang="ts">
import { computed} from 'vue';
import { useRouter } from 'vue-router';
import { SidebarTopUtils, SidebarBottomUtils } from '@/util/constant/SidebarUtils.ts';
import Logout from "@/assets/icon/sidebar-icon/Button.svg"


const authRoutes = ['Login', 'Register', 'InitiateForgotPassword'];

const router = useRouter();

const getCurrentRoute:any = computed(() => router.currentRoute.value.name);

const getCurrentRoutePath = computed(() => router.currentRoute.value.fullPath);

const isAuthRoute = computed(() => authRoutes.includes(getCurrentRoute.value));

function logout(){
  sessionStorage.clear()
  location.reload()
}
</script>

<template>
    <div class="sidebar-wrapper" v-if="!isAuthRoute">
          <div class="sidebar-wrapper-header">
            <h3 class="text-3xl text-white font-semibold">TMS PORTAL</h3>
          </div>
          <!-- <div class="search-wrapper">
            <input class="search-input" type="text" placeholder="Search..." autocomplete="off" />
          </div> -->
          <div class="sidebar-menubar">
            <div class="sidebar-top-nav">
              <router-link
                :to="i.route"
                v-for="(i, index) in SidebarTopUtils"
                :key="index"
                class="nav-item-base"
                :class="{ 'active-nav': getCurrentRoutePath == i.route || getCurrentRoutePath.includes(i.route) }"
              >
<!--                {{getCurrentRoutePath}}-->
<!--                {{i.route}}-->

                <img :src="i.icon" alt="" />
                <p>{{ i.name }}</p>
              </router-link>


            </div>
            <div class="sidebar-bottom-nav">
              <router-link
                :to="i.route"
                v-for="(i, index) in SidebarBottomUtils"
                :key="index"
                class="nav-item-base"
                :class="{ 'active-nav': getCurrentRoutePath === i.route }"
              >
                <img :src="i.icon" />
                <p>{{ i.name }}</p>
              </router-link>
              <div class="nav-item-base" @click="logout">
                <img :src="Logout" alt="" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
</template>

<style scoped>
.logo{
  width: 150px;
  padding: 10px;
  border-top-left-radius: 2rem;
  background-color: #F7F7F7;
}

  .sidebar-menubar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 100px;
    height: calc(100% - 30%);
    transform: scale(.9);
    transform-origin:0 0;

  }

  .sidebar-wrapper-header{
    margin-bottom: 2rem;
  }

  .hideShow{
    display: none;
  }



.sidebar-wrapper{
  width: 250px;
  background-color: var(--light_primary);
  display: block;
  transition: ease-in 0.3s;
  /* Sidebar navigation */
  padding: 25px;
  min-height: 100%;
  overflow: auto;

  /* Bizgem primary */

  /* Inside auto layout */

}



.sidebar-top-nav{
  width: 100%;
}

.sidebar-bottom-nav{
  width: 100%;
}

.search-input{
  /* Input */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 10.5px 14.7px;
gap: 8.4px;

width: 100%;
height: 47px;

background: rgba(167, 196, 222, 0.02);
/* White */
border: 1.05px solid #F7F7F7;
box-shadow: 0px 1.05px 2.1px rgba(16, 24, 40, 0.05);
border-radius: 8.4px;
margin: 25px 0;

/* Inside auto layout */
flex: none;
/* order: 0;
align-self: stretch;
flex-grow: 0; */

}

.search-input::placeholder{
  color: #fff;
}


.nav-item-base{
  /* _Nav item base */

  /* Auto layout */
  display: flex;
  align-items: center;
  padding: 8.4px 12.6px;
  gap: .4rem;

  width: 100%;
  height: 42px;
  /* Text */

  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  /* identical to box height, or 150% */

  /* Gray/100 */
  color: #fff;

  margin-bottom: 12px;
  cursor: pointer;

}

.nav-item-base:hover{
  background-color: #0F3E5F;
  color: #fafafa;
  font-weight: 700;
  background: #ffc10735;
  border-radius: 6.3px;

}

.active-nav{
  background-color: #0F3E5F;
  color: #fafafa;
  font-weight: 700;
  background: #ffc107;
  border-radius: 6.3px;
}

.no-sidebar{
  width: 0;
  opacity:0;
  background-color: #fff;
  display: none;
}

@media (max-width: 1024px) {
  .sidebar-wrapper{
    display: none;

  }

}
</style>