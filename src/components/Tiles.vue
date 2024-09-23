<template>
  <div class="card-container">
    <div class="card">
      <!-- Vorderseite der Kachel -->
      <div class="card-front">
        <div class="content">
          <!-- Linkes Icon -->
          <div class="icon">
            <slot name="icon"></slot>
          </div>
          <!-- Rechter Text -->
          <div class="text">
            <slot name="service"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/* Container für die Kachel */
.card-container {
  perspective: 1000px;
}

/* Basis-Stil der Kachel */
.card {
  width: 300px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

/* Stile für die Vorderseite */
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Flexbox-Container für Inhalt */
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}

/* Icon-Stil */
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #64a0e0;
  font-size: 24px;
  margin-right: 15px;
}

/* Text-Stil */
.text {
  flex-grow: 1;
  font-size: 18px;
  text-align: left;
  color: #333;
}

</style>
