<template>
  <div>
    <div class="desktop-blobs pt-s">
      <div class="desktop-blob-2-3">
        <h1 class="mt-xs mb-m">
          Entreprises
        </h1>
      </div>

      <div class="desktop-blob-1-3">
        <button
          v-if="permissionsCheck(['super', 'admin', 'editeur'])"
          class="btn rnd-xs py-s px-m full-x flex mb-s h5"
          @click="addPopupOpen"
        >
          <span class="mt-xxs">Ajouter une entreprise</span>  <i class="icon-24 icon-plus flex-right" />
        </button>
      </div>
    </div>

    <div class="tablet-blobs tablet-flex-direction-reverse">
      <div class="tablet-blob-1-3 flex mb-s">
        <Downloads
          v-if="entreprises.length"
          :formats="['csv', 'xlsx', 'ods']"
          section="entreprises"
          class="flex-right full-x"
        />
      </div>

      <div class="tablet-blob-2-3 flex">
        <div class="py-m h6 bold mb-xs">
          {{ resultat }}
        </div>
      </div>
    </div>

    <div class="line-neutral" />

    <Loader v-if="!loaded" />
    <EntreprisesTable
      v-else
      :entreprises="entreprises"
    />
  </div>
</template>

<script>
import Loader from './_ui/loader.vue'
import Downloads from './_common/downloads.vue'
import EntreprisesTable from './entreprises/table.vue'
import EntrepriseAddPopup from './entreprise/add-popup.vue'

export default {
  name: 'Entreprises',

  components: {
    Loader,
    Downloads,
    EntreprisesTable
  },

  data() {
    return {
      filtersOpened: false
    }
  },

  computed: {
    entreprises() {
      return this.$store.state.entreprises.list
    },

    user() {
      return this.$store.state.user.current
    },

    loaded() {
      return !!this.entreprises
    },

    resultat() {
      return `${this.entreprises.length} résultat${
        this.entreprises.length > 1 ? 's' : ''
      }`
    }
  },

  watch: {
    user: 'get'
  },

  created() {
    this.get()
  },

  methods: {
    async get() {
      await this.$store.dispatch('entreprises/get')
    },

    addPopupOpen() {
      this.$store.commit('popupOpen', {
        component: EntrepriseAddPopup
      })
    }
  }
}
</script>
