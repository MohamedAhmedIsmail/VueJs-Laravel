(self.webpackChunk=self.webpackChunk||[]).push([[6719],{3099:function(t){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},2092:function(t,e,a){var s=a(9974),r=a(8361),n=a(7908),o=a(7466),l=a(5417),c=[].push,i=function(t){var e=1==t,a=2==t,i=3==t,_=4==t,d=6==t,u=7==t,v=5==t||d;return function(h,m,p,f){for(var x,y,C=n(h),b=r(C),g=s(m,p,3),P=o(b.length),R=0,V=f||l,F=e?V(h,P):a||u?V(h,0):void 0;P>R;R++)if((v||R in b)&&(y=g(x=b[R],R,C),t))if(e)F[R]=y;else if(y)switch(t){case 3:return!0;case 5:return x;case 6:return R;case 2:c.call(F,x)}else switch(t){case 4:return!1;case 7:c.call(F,x)}return d?-1:i||_?_:F}};t.exports={forEach:i(0),map:i(1),filter:i(2),some:i(3),every:i(4),find:i(5),findIndex:i(6),filterReject:i(7)}},9974:function(t,e,a){var s=a(3099);t.exports=function(t,e,a){if(s(t),void 0===e)return t;switch(a){case 0:return function(){return t.call(e)};case 1:return function(a){return t.call(e,a)};case 2:return function(a,s){return t.call(e,a,s)};case 3:return function(a,s,r){return t.call(e,a,s,r)}}return function(){return t.apply(e,arguments)}}},9587:function(t,e,a){var s=a(111),r=a(7674);t.exports=function(t,e,a){var n,o;return r&&"function"==typeof(n=e.constructor)&&n!==a&&s(o=n.prototype)&&o!==a.prototype&&r(t,o),t}},3111:function(t,e,a){var s=a(4488),r=a(1340),n="["+a(1361)+"]",o=RegExp("^"+n+n+"*"),l=RegExp(n+n+"*$"),c=function(t){return function(e){var a=r(s(e));return 1&t&&(a=a.replace(o,"")),2&t&&(a=a.replace(l,"")),a}};t.exports={start:c(1),end:c(2),trim:c(3)}},1361:function(t){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},7327:function(t,e,a){"use strict";var s=a(2109),r=a(2092).filter;s({target:"Array",proto:!0,forced:!a(1194)("filter")},{filter:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},9653:function(t,e,a){"use strict";var s=a(9781),r=a(7854),n=a(4705),o=a(1320),l=a(6656),c=a(4326),i=a(9587),_=a(2190),d=a(7593),u=a(7293),v=a(30),h=a(8006).f,m=a(1236).f,p=a(3070).f,f=a(3111).trim,x="Number",y=r.Number,C=y.prototype,b=c(v(C))==x,g=function(t){if(_(t))throw TypeError("Cannot convert a Symbol value to a number");var e,a,s,r,n,o,l,c,i=d(t,"number");if("string"==typeof i&&i.length>2)if(43===(e=(i=f(i)).charCodeAt(0))||45===e){if(88===(a=i.charCodeAt(2))||120===a)return NaN}else if(48===e){switch(i.charCodeAt(1)){case 66:case 98:s=2,r=49;break;case 79:case 111:s=8,r=55;break;default:return+i}for(o=(n=i.slice(2)).length,l=0;l<o;l++)if((c=n.charCodeAt(l))<48||c>r)return NaN;return parseInt(n,s)}return+i};if(n(x,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var P,R=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof R&&(b?u((function(){C.valueOf.call(a)})):c(a)!=x)?i(new y(g(e)),a,R):g(e)},V=s?h(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),F=0;V.length>F;F++)l(y,P=V[F])&&!l(R,P)&&p(R,P,m(y,P));R.prototype=C,C.constructor=R,o(r,x,R)}},523:function(t,e,a){"use strict";a.d(e,{Z:function(){return r}});a(9653);var s={props:{rentPayments:{type:Array},totalRentPayments:{type:Number},taxRentPayments:{type:Array},totalTaxRentPayments:{type:Number},totalTaxValue:{type:Number},landlordVoucherReceipts:{type:Array},totalLandlordVoucherReceipts:{type:Number},landlordVoucherPayments:{type:Array},totalLandlordVoucherPayments:{type:Number}},computed:{hasResult:function(){return 0!=this.rentPayments.length||0!=this.taxRentPayments.length||0!=this.landlordVoucherReceipts.length||0!=this.landlordVoucherPayments.length}}},r=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mb-0"},[t.hasResult?a("div",[a("table",{ref:"table1",staticClass:"table table-bordered table-hover"},[t._m(0),t._v(" "),a("tbody",[t._l(t.rentPayments,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center"},[t._v(t._s(e.date_gregory))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.payment_number))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("سند إيجار")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.id))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.tenant.tenant_name))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(parseFloat(e.rent_amount).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("0")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.amount_note_statment))])])})),t._v(" "),t.rentPayments.length>0?a("tr",[a("td",{staticClass:"text-right font-weight-bold",attrs:{colspan:"5"}},[t._v("مجموع سندات الإيجار")]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v(t._s(parseFloat(t.totalRentPayments).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v("0")]),t._v(" "),a("td")]):t._e(),t._v(" "),t._l(t.taxRentPayments,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center"},[t._v(t._s(e.date_gregory))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.payment_number))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("سند إيجار ضريبي")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.id))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.tenant.tenant_name))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(parseFloat(e.rent_amount).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(parseFloat(e.tax_value).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.amount_note_statment))])])})),t._v(" "),t.taxRentPayments.length>0?a("tr",[a("td",{staticClass:"text-right font-weight-bold",attrs:{colspan:"5"}},[t._v("مجموع سندات الإيجار الضريبية")]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v(t._s(parseFloat(t.totalTaxRentPayments).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v(t._s(parseFloat(t.totalTaxValue).toFixed(2)))]),t._v(" "),a("td")]):t._e(),t._v(" "),t._l(t.landlordVoucherReceipts,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center"},[t._v(t._s(e.voucher_date_gregory))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.voucher_number))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("سند قبض مالك")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.id))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.landlord.landlord_name))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(parseFloat(e.amount).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("0")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.amount_note_statment))])])})),t._v(" "),t.landlordVoucherReceipts.length>0?a("tr",[a("td",{staticClass:"text-right font-weight-bold",attrs:{colspan:"5"}},[t._v("مجموع سندات قبض المالك")]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v(t._s(parseFloat(t.totalLandlordVoucherReceipts).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v("0")]),t._v(" "),a("td")]):t._e(),t._v(" "),t._l(t.landlordVoucherPayments,(function(e){return a("tr",{key:e.id},[a("td",{staticClass:"text-center"},[t._v(t._s(e.voucher_date_gregory))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.voucher_number))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("سند صرف مالك")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.id))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.landlord.landlord_name))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(parseFloat(e.amount).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center"},[t._v("0")]),t._v(" "),a("td",{staticClass:"text-center"},[t._v(t._s(e.amount_note_statment))])])})),t._v(" "),t.landlordVoucherPayments.length>0?a("tr",[a("td",{staticClass:"text-right font-weight-bold",attrs:{colspan:"5"}},[t._v("مجموع سندات صرف المالك")]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v(t._s(parseFloat(t.totalLandlordVoucherPayments).toFixed(2)))]),t._v(" "),a("td",{staticClass:"text-center font-weight-bold"},[t._v("0")]),t._v(" "),a("td")]):t._e()],2)])]):a("div",[a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("br")])])}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("تاريخ السند")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("رقم السند")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("نوع السند")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("رقم العميل")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("اسم العميل")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("المبلغ")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("الضريبة")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("ملاحظات")])])])}],!1,null,null,null).exports},6719:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return r}});a(7327);var s={page:{title:"تقرير شامل",meta:[{name:"description"}]},components:{CompletedTablle:a(523).Z},data:function(){return{name:"Print Completed Report",title:"تقرير شامل",form:{},settings:{},options:[],rentPayments:[],totalRentPayments:0,taxRentPayments:[],totalTaxRentPayments:0,totalTaxValue:0,landlordVoucherReceipts:[],totalLandlordVoucherReceipts:0,landlordVoucherPayments:[],totalLandlordVoucherPayments:0,selectedOptionsAr:[],selectedOptionsArStatment:""}},methods:{handlePrint:function(){window.print()}},created:function(){this.form=this.$route.params.form,this.settings=this.$route.params.settings,this.options=this.$route.params.options,this.rentPayments=this.$route.params.rentPayments,this.totalRentPayments=this.$route.params.totalRentPayments,this.taxRentPayments=this.$route.params.taxRentPayments,this.totalTaxRentPayments=this.$route.params.totalTaxRentPayments,this.totalTaxValue=this.$route.params.totalTaxValue,this.landlordVoucherReceipts=this.$route.params.landlordVoucherReceipts,this.totalLandlordVoucherReceipts=this.$route.params.totalLandlordVoucherReceipts,this.landlordVoucherPayments=this.$route.params.landlordVoucherPayments,this.totalLandlordVoucherPayments=this.$route.params.totalLandlordVoucherPayments;for(var t=this,e=t.form.selectedOptions,a=function(a){var s=e[a],r=t._.filter(t.options,(function(t){return t.value==s}));t.selectedOptionsAr.push(r[0].text),a===e.length-1?t.selectedOptionsArStatment+=r[0].text:t.selectedOptionsArStatment+=r[0].text+" و "},s=0;s<e.length;s++)a(s)}},r=(0,a(1900).Z)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tenant_contract"},[a("div",{staticClass:"print-nav"},[a("a",{staticClass:"left btn btn-outline-primary",on:{click:function(e){return t.$router.back()}}},[a("i",{staticClass:"mdi mdi-backspace"})]),t._v(" "),a("a",{staticClass:"right btn btn-outline-primary",on:{click:t.handlePrint}},[a("i",{staticClass:"mdi mdi-printer"})])]),t._v(" "),a("div",{staticClass:"container"},[a("br"),t._v(" "),a("b-img",{attrs:{src:t.settings.contract_header,fluid:"",alt:"Responsive image"}}),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("p",[t._v("\n            تقرير شامل: \n            "+t._s(t.selectedOptionsArStatment)+"\n        ")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("p",[t._v("\n                            للفترة من: \n                            "),a("span",{attrs:{dir:"ltr"}},[t._v(t._s(t.form.date_start))])])]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("p",[t._v("\n                            الى: \n                            "),a("span",{attrs:{dir:"ltr"}},[t._v(t._s(t.form.date_end))])])])])])]),t._v(" "),a("br"),t._v(" "),a("CompletedTablle",{attrs:{rentPayments:t.rentPayments,totalRentPayments:t.totalRentPayments,taxRentPayments:t.taxRentPayments,totalTaxRentPayments:t.totalTaxRentPayments,totalTaxValue:t.totalTaxValue,landlordVoucherReceipts:t.landlordVoucherReceipts,totalLandlordVoucherReceipts:t.totalLandlordVoucherReceipts,landlordVoucherPayments:t.landlordVoucherPayments,totalLandlordVoucherPayments:t.totalLandlordVoucherPayments}}),t._v(" "),a("br")],1)])}),[],!1,null,null,null).exports}}]);