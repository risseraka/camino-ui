<template>
  <div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Durée (années / mois)</h6>
        <p class="h6 italic mb-0">
          Optionnel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <div
          class="tablet-blobs"
          :class="{ 'mb-s': !etape.duree.ans && !etape.duree.mois }"
        >
          <div class="tablet-blob-1-2">
            <input
              v-model.number="etape.duree.ans"
              type="number"
              min="0"
              placeholder="années"
              class="p-s mb-s"
            >
          </div>
          <div class="tablet-blob-1-2">
            <input
              v-model.number="etape.duree.mois"
              type="number"
              min="0"
              placeholder="mois"
              class="p-s"
            >
          </div>
        </div>
        <label
          v-if="etape.duree.ans || etape.duree.mois"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.duree"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date de début</h6>
        <p class="h6 italic mb-0">
          Optionnel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model="etape.dateDebut"
          type="date"
          class="p-s"
          placeholder="aaaa-mm-jj"
          :class="{ 'mb-s': etape.dateDebut, mb: !etape.dateDebut }"
        >
        <label
          v-if="etape.dateDebut"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.dateDebut"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Date d'échéance</h6>
        <p class="h6 italic mb-0">
          Optionnel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model="etape.dateFin"
          type="date"
          class="p-s"
          placeholder="aaaa-mm-jj"
          :class="{ 'mb-s': etape.dateFin, mb: !etape.dateFin }"
        >
        <label
          v-if="etape.dateFin"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.dateFin"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <div class="tablet-blobs">
      <div class="tablet-blob-1-3 tablet-pt-s pb-s">
        <h6>Surface (Km²)</h6>
        <p class="h6 italic mb-0">
          Optionnel
        </p>
      </div>
      <div class="tablet-blob-2-3">
        <input
          v-model.number="etape.surface"
          class="p-s"
          type="number"
          min="0"
          placeholder="0"
          :class="{ 'mb-s': etape.surface, mb: !etape.surface }"
        >
        <label
          v-if="etape.surface"
          class="h5"
        >
          <input
            v-model="etape.incertitudes.surface"
            type="checkbox"
          >donnée incertaine
        </label>
      </div>
    </div>

    <hr>

    <h3 class="mb-s">
      Titulaires
    </h3>
    <p class="h6 italic mb-s">
      Optionnel
    </p>
    <div
      v-for="(titulaire, n) in etape.titulaires"
      :key="`titluaire-${titulaire.id}`"
    >
      <div
        class="flex"
        :class="{ 'mb-s': titulairesLength, mb: !titulairesLength }"
      >
        <select
          v-model="etape.titulaires[n]"
          class="p-s mr-s"
        >
          <option
            v-for="entreprise in entreprises"
            :key="`titulaire-${titulaire.id}-entreprise-${entreprise.id}`"
            :value="{ id: entreprise.id }"
            :disabled="etape.titulaires.find(id => id === entreprise.id)"
          >
            {{ `${entreprise.nom} (${entreprise.id})` }}
          </option>
        </select>
        <button
          class="btn py-s px-m rnd-xs"
          @click="titulaireRemove(n)"
        >
          <i class="icon-24 icon-minus" />
        </button>
      </div>
    </div>

    <button
      v-if="!etape.titulaires.some(({ id }) => id === '')"
      class="btn rnd-xs py-s px-m full-x flex h5"
      :class="{ 'mb-s': titulairesLength, mb: !titulairesLength }"
      @click="titulaireAdd"
    >
      <span class="mt-xxs">Ajouter un titulaire</span><i class="icon-24 icon-plus flex-right" />
    </button>

    <label
      v-if="titulairesLength"
      class="h5"
    >
      <input
        v-model="etape.incertitudes.titulaires"
        type="checkbox"
      >donnée incertaine
    </label>
    <hr>

    <h3 class="mb-s">
      Amodiataires
    </h3>
    <p class="h6 italic mb-s">
      Optionnel
    </p>
    <div
      v-for="(amodiataire, n) in etape.amodiataires"
      :key="`amodiataire-${amodiataire.id}`"
    >
      <div
        class="flex"
        :class="{ 'mb-s': amodiatairesLength, mb: !amodiatairesLength }"
      >
        <select
          v-model="etape.amodiataires[n]"
          class="p-s mr-s"
        >
          <option
            v-for="entreprise in entreprises"
            :key="`amodiataire-${amodiataire.id}-entreprise-${entreprise.id}`"
            :value="{ id: entreprise.id }"
            :disabled="etape.amodiataires.find(id => id === entreprise.id)"
          >
            {{ entreprise.nom }} ({{ entreprise.id }})
          </option>
        </select>
        <button
          class="btn py-s px-m rnd-xs"
          @click="amodiataireRemove(n)"
        >
          <i class="icon-24 icon-minus" />
        </button>
      </div>
    </div>

    <button
      v-if="!etape.amodiataires.some(({ id }) => id === '')"
      class="btn rnd-xs py-s px-m full-x flex h5"
      :class="{ 'mb-s': amodiatairesLength, mb: !amodiatairesLength }"
      @click="amodiataireAdd"
    >
      <span class="mt-xxs">Ajouter un amodiataire</span><i class="icon-24 icon-plus flex-right" />
    </button>

    <label
      v-if="amodiatairesLength"
      class="h5"
    >
      <input
        v-model="etape.incertitudes.amodiataires"
        type="checkbox"
      >donnée incertaine
    </label>
    <hr>

    <h3 class="mb-s">
      Substances
    </h3>
    <p class="h6 italic mb-s">
      Optionnel
    </p>
    <div
      v-for="(substance, n) in etape.substances"
      :key="n"
    >
      <div
        class="flex"
        :class="{ 'mb-s': substancesLength, mb: !substancesLength }"
      >
        <select
          v-model="etape.substances[n]"
          class="p-s mr-s"
        >
          <option
            v-for="s in substances"
            :key="s.id"
            :value="{ id: s.id }"
            :disabled="etape.substances.find(({id}) => id === s.id)"
          >
            {{ s.nom }}
          </option>
        </select>
        <button
          class="btn py-s px-m rnd-xs"
          @click="substanceRemove(n)"
        >
          <i class="icon-24 icon-minus" />
        </button>
      </div>
    </div>

    <button
      v-if="!etape.substances.some(({ id }) => id === '')"
      class="btn rnd-xs py-s px-m full-x flex h5"
      :class="{ 'mb-s': substancesLength, mb: !substancesLength }"
      @click="substanceAdd"
    >
      <span class="mt-xxs">Ajouter une substance</span><i class="icon-24 icon-plus flex-right" />
    </button>

    <label
      v-if="substancesLength"
      class="h5"
    >
      <input
        v-model="etape.incertitudes.substances"
        type="checkbox"
      >donnée incertaine
    </label>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    etape: { type: Object, default: () => ({}) },
    domaineId: { type: String, default: '' }
  },

  computed: {
    entreprises() {
      return this.$store.state.titreEtape.metas.entreprises
    },

    substances() {
      return this.$store.state.titreEtape.metas.substances.filter(su =>
        su.legales.find(sl => sl.domaine.id === this.domaineId)
      )
    },

    titulairesLength() {
      return this.etape.titulaires.filter(({ id }) => id).length
    },

    amodiatairesLength() {
      return this.etape.amodiataires.filter(({ id }) => id).length
    },

    substancesLength() {
      return this.etape.substances.filter(({ id }) => id).length
    }
  },

  methods: {
    titulaireAdd() {
      this.etape.titulaires.push({ id: '' })
    },

    titulaireRemove(index) {
      this.etape.titulaires.splice(index, 1)
    },

    amodiataireAdd() {
      this.etape.amodiataires.push({ id: '' })
    },

    amodiataireRemove(index) {
      this.etape.amodiataires.splice(index, 1)
    },

    substanceAdd() {
      this.etape.substances.push({ id: '' })
    },

    substanceRemove(index) {
      this.etape.substances.splice(index, 1)
    }
  }
}
</script>
