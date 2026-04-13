const { from } = require("rxjs");

class LibroUseCases {
  constructor(libroRepository) {
    this.libroRepository = libroRepository;
  }

  listarLibros() {
    return from(this.libroRepository.findAll());
  }
}

module.exports = LibroUseCases;
