<template>
    <div style="margin-top: 25px;">
        <button v-if="$i18n.locale=='ar'" type="submit" @click="$i18n.locale = 'en';onChange();" >Ar</button>
        <button v-if="$i18n.locale=='en'" type="submit" @click="$i18n.locale = 'ar';onChange();" >En</button>
<!--        <span class="d-xl-inline-block ml-1">-->
<!--        <select v-model="$i18n.locale" v-on:change="onChange()">-->
<!--            <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">-->
<!--                {{ lang }}-->
<!--            </option>-->
<!--        </select>-->
<!--    </span>-->

    </div>
</template>

<script>

    export default {
        name: 'SelectLocale',
        data() {
            return {langs: ['en', 'ar']}
        },
        methods: {
            onChange() {
                if (this.$i18n.locale == "ar") {
                    import('../assets/scss/app.scss');
                    const elems = document.getElementsByTagName("*");

                    for (let elem of elems) {
                        elem.style.direction = 'rtl'
                    }
                    console.log(elems);

                } if (this.$i18n.locale == "en") {
                    this.$router.go();
                }
            },
        }
    }
</script>