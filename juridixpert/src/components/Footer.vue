<template>
  <v-footer dark padless app inset>
    <v-card
      class="flex"
      flat
      tile
      color="#EC5D0F"
      :elevation="10"
    >
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Juridique Platforme Tous droits réservés</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>