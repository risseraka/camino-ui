import titresDemarches from './titres-demarches'
import * as api from '../api/titres-demarches'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('../api/titres-demarches', () => ({
  metasDemarches: jest.fn(),
  demarches: jest.fn()
}))

console.info = jest.fn()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('liste des demarches', () => {
  let actions
  let mutations
  let store
  let demarchesListe
  beforeEach(() => {
    demarchesListe = ['demarche-1', 'demarche-2', 'demarche-3']
    titresDemarches.state = {
      list: [],
      total: null,
      metas: {
        types: [],
        statuts: [],
        etapesTypes: [],
        titresTypes: [],
        titresDomaines: [],
        titresStatuts: []
      },
      params: [
        { id: 'typesIds', type: 'strings', elements: [] },
        { id: 'statutsIds', type: 'strings', elements: [] },
        { id: 'titresDomainesIds', type: 'strings', elements: [] },
        { id: 'titresTypesIds', type: 'strings', elements: [] },
        { id: 'titresStatutsIds', type: 'strings', elements: [] },
        { id: 'etapesInclues', type: 'strings', elements: [] },
        { id: 'etapesExclues', type: 'strings', elements: [] },
        { id: 'page', type: 'number', min: 0 },
        { id: 'intervalle', type: 'number', min: 10, max: 500 },
        {
          id: 'colonne',
          type: 'string',
          elements: [
            'titreNom',
            'titreDomaine',
            'titreType',
            'titreStatut',
            'type',
            'statut'
          ]
        },
        { id: 'ordre', type: 'string', elements: ['asc', 'desc'] }
      ],
      preferences: {
        table: {
          page: 1,
          intervalle: null,
          ordre: 'asc',
          colonne: 'titreNom'
        },
        filtres: {
          typesIds: [],
          statutsIds: [],
          titresDomainesIds: [],
          titresTypesIds: [],
          titresStatutsIds: [],
          etapesIncluesIds: [],
          etapesExcluesIds: []
        }
      }
    }

    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn(),
      popupMessageAdd: jest.fn()
    }

    actions = {
      apiError: jest.fn(),
      messageAdd: jest.fn()
    }

    store = new Vuex.Store({
      modules: { titresDemarches },
      mutations,
      actions
    })
  })

  test('récupère les métas pour afficher des démarches', async () => {
    const apiMock = api.metasDemarches
      .mockResolvedValueOnce({
        demarchesTypes: [{ id: 'id-demarchesTypes' }],
        demarchesStatuts: [{ id: 'id-demarchesStatuts' }],
        etapesTypes: [{ id: 'id-etapesTypes' }],
        types: [{ id: 'id-types' }],
        domaines: [{ id: 'id-domaines' }],
        statuts: [{ id: 'id-statuts' }],
        truc: [{ id: 'id-truc' }]
      })
      .mockResolvedValueOnce({})

    await store.dispatch('titresDemarches/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.metas).toEqual({
      types: [{ id: 'id-demarchesTypes' }],
      statuts: [{ id: 'id-demarchesStatuts' }],
      etapesTypes: [{ id: 'id-etapesTypes' }],
      titresTypes: [{ id: 'id-types' }],
      titresDomaines: [{ id: 'id-domaines' }],
      titresStatuts: [{ id: 'id-statuts' }]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()

    await store.dispatch('titresDemarches/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(store.state.titresDemarches.metas).toEqual({
      types: [{ id: 'id-demarchesTypes' }],
      statuts: [{ id: 'id-demarchesStatuts' }],
      etapesTypes: [{ id: 'id-etapesTypes' }],
      titresTypes: [{ id: 'id-types' }],
      titresDomaines: [{ id: 'id-domaines' }],
      titresStatuts: [{ id: 'id-statuts' }]
    })
    expect(mutations.loadingRemove).toHaveBeenCalled()
  })

  test("retourne une erreur si l'api ne répond pas", async () => {
    const apiMock = api.metasDemarches.mockRejectedValue(
      new Error("erreur de l'api")
    )

    await store.dispatch('titresDemarches/metasGet')

    expect(apiMock).toHaveBeenCalled()
    expect(mutations.loadingRemove).toHaveBeenCalled()
    expect(mutations.popupMessageAdd).toHaveBeenCalled()
  })

  test('obtient la liste des demarches', async () => {
    const apiMock = api.demarches.mockResolvedValue({
      elements: demarchesListe
    })
    await store.dispatch('titresDemarches/get')

    expect(apiMock).toHaveBeenCalled()
    expect(actions.messageAdd).toHaveBeenCalled()
    expect(store.state.titresDemarches.list).toEqual(demarchesListe)
  })

  test("retourne une erreur si l'api ne repond pas", async () => {
    const apiMock = api.demarches.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('titresDemarches/get')

    expect(apiMock).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test('initialise les preferences de filtre', async () => {
    const section = 'filtres'
    const params = { domainesIds: 'h' }
    await store.dispatch('titresDemarches/preferencesSet', { section, params })

    expect(store.state.titresDemarches.preferences.filtres.domainesIds).toEqual(
      'h'
    )
  })
})
