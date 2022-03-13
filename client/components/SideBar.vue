<!--Main Navigation-->
<template>
  <aside>
    <!-- Sidebar -->
    <nav
      id="sidebarMenu"
      class="h-screen collapse d-lg-block sidebar collapse bg-white"
    >
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4 text-2xl font-bold">
          <ul>
            <li><span>&#128221; Form</span></li>
            <li><span>&#10067; Quest </span></li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Sidebar -->
  </aside>
  <!--Main Navigation-->
</template>

<style lang="postcss" scoped>
body {
  background-color: #fbfbfb;
}
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}

/* Sidebar */
.sidebar {
  /* position: relative; */
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0; /* Height of navbar */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 600;
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}
.sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>
