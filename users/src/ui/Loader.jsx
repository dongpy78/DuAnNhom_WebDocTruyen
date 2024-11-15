function Loader() {
  return (
    <>
      <button class="btn btn-primary" type="button" disabled>
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </button>
    </>
  );
}

export default Loader;
