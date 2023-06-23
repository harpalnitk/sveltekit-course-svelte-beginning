<script>
    //import settings from '$lib/stores/writeable-store';
    import settings from '$lib/stores/custom-store';
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@300;500;700&family=Montserrat:wght@300;400;500;600;700&family=Tapestry&display=swap" rel="stylesheet">

{#if $settings.colorScheme === 'dark'}

<style>
  :root{
    --background-color: #1d1d1d;
    --textColor: #fff;
  }
</style>
{:else}
<style>
    :root{
      --background-color: #ffffff;
      --textColor: #000000;
    }
  </style>
{/if}

  </svelte:head>