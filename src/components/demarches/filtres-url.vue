<template>
  <div>
    <Url
      :params="params"
      :values="preferences"
      @params:update="preferencesUpdate"
    />
    <Filtres @demarches:update="demarchesUpdate" />
  </div>
</template>

<script>
import Url from '../_ui/url.vue'
import Filtres from './filtres.vue'

export default {
  components: {
    Url,
    Filtres
  },

  computed: {
    preferences() {
      return this.$store.state.titresDemarches.preferences.filtres
    },

    params() {
      const paramsIds = Object.keys(this.preferences)

      return this.$store.state.titresDemarches.params.reduce((p, param) => {
        if (paramsIds.includes(param.id)) {
          p[param.id] = param
        }

        return p
      }, {})
    }
  },

  methods: {
    demarchesUpdate() {
      this.$emit('demarches:update')
    },

    preferencesUpdate(params) {
      this.$store.dispatch('titresDemarches/preferencesSet', {
        section: 'filtres',
        params
      })
    }
  }
}
</script>
