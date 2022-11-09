<script>
import { layoutMethods } from "@/state/helpers";
import { menuItems } from "./horizontal-menu";

export default {
  data() {
    return {
      menuItems: menuItems
    };
  },
  methods: {
    ...layoutMethods,

    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling;
      if (nextEl && !nextEl.classList.contains("show")) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("show");
        }
        nextEl.classList.add("show");
      } else if (nextEl) {
        nextEl.classList.remove("show");
      }
      return false;
    },
    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item) {
      return item.subItems !== undefined ? item.subItems.length > 0 : false;
    },
    change_layout(layout) {
      return this.changeLayoutType({ layoutType: layout });
    },
    topbarLight() {
      document.body.setAttribute("data-topbar", "light");
      document.body.removeAttribute("data-layout-size", "boxed");
    },
    boxedWidth() {
      document.body.setAttribute("data-layout-size", "boxed");
      document.body.removeAttribute("data-topbar", "light");
      document.body.setAttribute("data-topbar", "dark");
    }
  },
  mounted() {
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }
    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("active");
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.add("active");
          var childAnchor = parent3.querySelector(".has-dropdown");
          if (childAnchor) childAnchor.classList.add("active");
        }

        const parent4 = parent3.parentElement;
        if (parent4) parent4.classList.add("active");
        const parent5 = parent4.parentElement;
        if (parent5) parent5.classList.add("active");
      }
    }
  },
};
</script>

<template>
  <div class="topnav">
    <div class="container-fluid">
      <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
        <div class="collapse navbar-collapse" id="topnav-menu-content">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link side-nav-link-ref">
                  <i class="mdi mdi-desktop-mac-dashboard"></i>
                  <span>الرئيسية</span>
              </router-link>
            </li>
            <li v-if="$can('access_admin') ||
                $can('access_landlord') ||
                $can('access_property') ||
                $can('access_rental_unit') ||
                $can('access_tenant')"
                class="nav-item dropdown"
            >
              <a
                href="javascript: void(0);"
                aria-current="page"
                class="nav-link dropdown-toggle arrow-none"
              >
                <i class="mdi mdi-file-document-edit-outline"></i> تأسيس البيانات
                <div class="arrow-down"></div>
              </a>
              <div aria-labelledby="topnav-dashboard" class="dropdown-menu row">
                <span v-if="$can('access_admin')">
                  <router-link to="/admins" aria-current="page" class="col dropdown-item side-nav-link-ref" >المستخدمون</router-link>
                </span>
                <span v-if="$can('access_landlord')">
                  <router-link to="/landlords" class="col dropdown-item side-nav-link-ref" >الملاك</router-link>
                </span>
                <span v-if="$can('access_property')">
                  <router-link to="/properties" class="col dropdown-item side-nav-link-ref" >العقارات</router-link>
                </span>
                <span v-if="$can('access_rental_unit')">
                  <router-link to="/rental-units" class="col dropdown-item side-nav-link-ref" >وحدات الإيجار</router-link>
                </span>
                <span v-if="$can('access_tenant')">
                  <router-link to="/tenants" class="col dropdown-item side-nav-link-ref" >المستأجرين</router-link>
                </span>
              </div>
            </li>
            <li v-if="$can('access_rent_payment') || $can('access_landlord_voucher')"
                class="nav-item dropdown"
            >
              <a
                href="javascript: void(0);"
                aria-current="page"
                class="nav-link dropdown-toggle arrow-none"
              >
                <i class="mdi mdi-trending-up"></i> الحركة
                <div class="arrow-down"></div>
              </a>
              <div aria-labelledby="topnav-dashboard" class="dropdown-menu row">
                <span v-if="$can('access_rent_payment')">
                  <router-link to="/rent-payments" aria-current="page" class="col dropdown-item side-nav-link-ref" >سندات الإيجار</router-link>
                </span>
                <span v-if="$can('access_landlord_voucher')">
                  <router-link to="/landlord-vouchers" aria-current="page" class="col dropdown-item side-nav-link-ref" >سندات الملاك</router-link>
                </span>
              </div>
            </li>
            <li 
                v-if="$can('view_completed_report') ||
                    $can('view_landlord_account_statement') ||
                    $can('view_tenant_account_statement') ||
                    $can('view_tenants_report') ||
                    $can('view_rental_units_report') ||
                    $can('view_incoming_bonds') ||
                    $can('view_daily_report')"
                class="nav-item dropdown"
            >
              <a
                href="javascript: void(0);"
                aria-current="page"
                class="nav-link dropdown-toggle arrow-none"
              >
                <i class="bx ri-bar-chart-line"></i> التقارير
                <div class="arrow-down"></div>
              </a>
              <div aria-labelledby="topnav-dashboard" class="dropdown-menu row">
                <span v-if="$can('view_completed_report')">
                  <router-link to="/completed-report" aria-current="page" class="col dropdown-item side-nav-link-ref" >التقرير الشامل</router-link>
                </span>
                <span v-if="$can('view_landlord_account_statement')">
                  <router-link to="/landlord-account-statement" aria-current="page" class="col dropdown-item side-nav-link-ref" >كشف حساب مالك</router-link>
                </span>
                <span v-if="$can('view_tenant_account_statement')">
                  <router-link to="/tenant-account-statement" aria-current="page" class="col dropdown-item side-nav-link-ref" >كشف حساب مستأجر</router-link>
                </span>
                <span v-if="$can('view_tenants_report')">
                  <router-link to="/tenants-report" aria-current="page" class="col dropdown-item side-nav-link-ref" >تقرير المستأجرين</router-link>
                </span>
                <span v-if="$can('view_rental_units_report')">
                  <router-link to="/rental-units-report" aria-current="page" class="col dropdown-item side-nav-link-ref" >تقرير الشقق</router-link>
                </span>
                <span v-if="$can('view_incoming_bonds')">
                  <router-link to="/incoming-bonds" aria-current="page" class="col dropdown-item side-nav-link-ref" >تقرير السندات الواردة</router-link>
                </span>
                <span v-if="$can('view_daily_report')">
                  <router-link to="/daily-report" aria-current="page" class="col dropdown-item side-nav-link-ref" >تقرير اليومية</router-link>
                </span>
              </div>
            </li>
            <li v-if="$can('edit_app_setting') || $can('access_nationality')"
              class="nav-item dropdown">
              <a
                href="javascript: void(0);"
                aria-current="page"
                class="nav-link dropdown-toggle arrow-none"
              >
                <i class="dripicons-gear"></i> اعدادات البرنامج
                <div class="arrow-down"></div>
              </a>
              <div aria-labelledby="topnav-dashboard" class="dropdown-menu row">
                <span v-if="$can('edit_app_setting')">
                  <router-link to="/app_settings" aria-current="page" class="col dropdown-item side-nav-link-ref" >إعدادات عامة</router-link>
                </span>
                <span v-if="$can('access_nationality')">
                  <router-link to="/nationalities" aria-current="page" class="col dropdown-item side-nav-link-ref" >الجنسيات</router-link>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>