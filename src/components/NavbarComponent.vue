<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div class="container">
            <router-link to="/" class="navbar-brand">Base secreta</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/random-pokemon" class="nav-link"
                            exact-active-class="active">Clásico</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/list-pokemon" class="nav-link">Lista</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link to="/#" class="nav-link">Generador</router-link>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarComponent',
};
</script>

<style scoped>
.navbar-brand {
    font-weight: bold;
}

.nav-link {
    margin-right: 1rem;
}

.nav-link.active {
    font-weight: bold;
    color: #007bff;
}
</style>