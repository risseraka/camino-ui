import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

// for safari 11
import fetch from 'unfetch'

import queryTitres from './queries/titres'
import queryTitre from './queries/titre'

console.log('api:', process.env.VUE_APP_API_URL)

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_API_URL,
  fetch
})

const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const titres = async ({ typeIds, domaineIds, statutIds, substances, noms }) => {
  const res = await graphqlClient.query({
    query: queryTitres,
    variables: {
      typeIds,
      domaineIds,
      statutIds,
      substances,
      noms
    }
  })

  return res.data
}

const titre = async id => {
  const res = await graphqlClient.query({
    query: queryTitre,
    variables: { id }
  })

  return res.data.titre
}

export { titres, titre }
