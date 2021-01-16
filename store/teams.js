import firebase from "firebase";

export const state = () => ({
  teams: []
})

export const actions = {
  async getTeams({ commit }, { season } = { season: 6 }) {
    const db = firebase.firestore();
    const res = await db.collection(`tournaments/spladder${season}/teams`).get()
    let list = [];
    res.forEach(teamRef => {
      const teamData = {
        docId: teamRef.id,
        ...teamRef.data(),
      };
      list.push(teamData);
    });
    commit('setTeams', list);
  },
}

export const mutations = {
  setTeams(state, data) {
    state.teams = data;
  },
}
