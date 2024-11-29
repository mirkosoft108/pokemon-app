<template>
    <div class="welcome-layout">
        <div class="welcome-content">
        <img class="welcome-image" src="../assets/Pikachu.svg" alt="Pikachu" />
        <h1 class="welcome-title">Welcome to Pokedex</h1>
        <p class="welcome-description">
            The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
        </p>
        <img 
            class="welcome-button" 
            src="../assets/buttons/GetStartedButton.svg" 
            alt="Get Started Button" 
            @click="startPokedex"
        />
        </div>
    </div>
</template>

<script setup>
    const startPokedex = () => {
        console.log("Starting the Pokedex...");
    };
</script>

<style scoped>

.welcome-layout {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    padding: 0;
    box-sizing: border-box; 
}

.welcome-content {
    max-width: 100%; 
    max-height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.welcome-image {
    margin-bottom: 60px;
    max-width: 90%;
    width: 325px; 
    height: auto;
 
}

.welcome-title {
    font-weight: 700; 
    font-size: 26px; 
    line-height: 31.2px; 
    text-align: center;
    color: #353535;
    margin-bottom: 30px;
}

.welcome-description {
    margin-bottom: 40px;
    width: 315px;
    font-weight: 500; 
    font-size: 18px; 
    line-height: 27px; 
    text-align: center;
    color: #5E5E5E;
}

.welcome-button {
    padding: 8px 20px; 
    font-size: 0.9rem;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

@media (min-width: 1152px) {
    .welcome-content {}

    .welcome-title {
        width: 570px;
    }

    .welcome-description {
        width: 570px;
    }

    .welcome-button {}
}
</style>
  