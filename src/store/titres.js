import Vue from 'vue'
import { titres } from '../api/index.js'
import { titreFormat } from './_utils.js'

export const state = {
  liste: null,
  domaines: [
    {
      id: 'm',
      nom: 'Minéraux et métaux',
      couleur: '#498bd6',
      checked: true
    },
    {
      id: 'h',
      nom: 'Substances énergétiques',
      couleur: '#856940',
      checked: true
    },
    {
      id: 's',
      nom: 'Stockage',
      couleur: '#8468b1',
      checked: true
    },
    {
      id: 'g',
      nom: 'Géothermie',
      couleur: '#d16c3e',
      checked: true
    },
    {
      id: 'c',
      nom: 'Carrières et granulats marins',
      couleur: '#3ed1ac',
      checked: true
    }
  ],
  types: [
    {
      id: 'apx',
      nom: 'autorisation de prospections préalables',
      checked: true
    },
    {
      id: 'arc',
      nom: 'autorisation de recherches',
      checked: true
    },
    {
      id: 'arg',
      nom: 'autorisation de recherches',
      checked: true
    },
    {
      id: 'axm',
      nom: "autorisation d'exploitation",
      checked: true
    },
    {
      id: 'cxx',
      nom: 'concession',
      checked: true
    },
    {
      id: 'prh',
      nom: 'permis exclusif de recherches',
      checked: true
    },
    {
      id: 'prx',
      nom: 'permis exclusif de recherches',
      checked: true
    },
    {
      id: 'pxc',
      nom: 'permis exclusif de carrières',
      checked: true
    },
    {
      id: 'pxg',
      nom: "permis d'exploitation",
      checked: true
    },
    {
      id: 'pxm',
      nom: "permis d'exploitation",
      checked: true
    }
  ],
  statuts: [
    {
      id: 'dmi',
      nom: 'demande initiale',
      couleur: 'warning',
      checked: true
    },
    {
      id: 'dmc',
      nom: 'demande classée',
      couleur: 'neutral',
      checked: true
    },
    {
      id: 'val',
      nom: 'valide',
      couleur: 'success',
      checked: true
    },
    {
      id: 'mdi',
      nom: 'modification en instance',
      couleur: 'warning',
      checked: true
    },
    {
      id: 'ech',
      nom: 'échu',
      couleur: 'neutral',
      checked: true
    }
  ]
}

export const actions = {
  filterToggle({ state, dispatch, commit }, { name, value, property }) {
    state[name]
      .filter(e => e[property].toString() === value)
      .forEach(fi => commit('filterToggle', fi))
    dispatch('get')
  },
  async get({ state, commit }) {
    const typeIds = state.types.filter(e => e.checked).map(e => e.id)
    const domaineIds = state.domaines.filter(e => e.checked).map(e => e.id)
    const statutIds = state.statuts.filter(e => e.checked).map(e => e.id)
    const substances = []

    const ts = await titres({
      typeIds,
      domaineIds,
      statutIds,
      substances
    })

    commit('set', ts.map(t => titreFormat(t)))
  }
}

export const getters = {}

export const mutations = {
  set(state, titres) {
    Vue.set(state, 'liste', titres)
  },
  filterToggle(state, f) {
    Vue.set(f, 'checked', !f.checked)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
