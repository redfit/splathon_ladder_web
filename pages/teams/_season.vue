
<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <v-container>
      <v-card v-if="teams">
        <v-card-title>
          Season {{ season }} チーム一覧
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="検索"
            sigle-line
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="teams"
          :search="search"
          :loading="loading"
          :disable-pagination=true
          :hide-default-footer=true
          :disable-sort=true
          class="elevation-1"
        >
        </v-data-table>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: "Teams",
  data(){
    return {
      loading: true,
      season: this.$route.params.season ?? 6, // TODO: state current season
      search: "",
      headers: [
        { text: 'チーム名', value: 'name' },
        { text: 'プレイヤー1', value: 'player1' },
        { text: 'プレイヤー2', value: 'player2' },
        { text: 'プレイヤー3', value: 'player3' },
        { text: 'プレイヤー4', value: 'player4' },
        { text: 'プレイヤー5', value: 'player5' },
      ],
    }
  },
  computed: {
    ...mapState({
      teams: state => state.teams.teams,
    }),
  },
  mounted(){
    this.getTeams({ season: this.season }).then(() => this.loading = false);

  },
  methods: {
    ...mapActions({
      getTeams: 'teams/getTeams',
    }),
  },
  validate ({ params }) {
    return params.season === undefined || /^\d+$/.test(params.season) && params.season <= 6 // TODO: state current season
  }
}
</script>
