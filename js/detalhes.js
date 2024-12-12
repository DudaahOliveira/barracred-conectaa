const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const media = params.get('media');
// console.log("Id: ", id, " - Midia: ", media);

// Ao carregar a página executa as funções de buscar os dados
document.addEventListener("DOMContentLoaded", async () => {
    await getMovie();
  
});

async function getMovie() {
    let movie;
    let baseUrl = 'https://api.themoviedb.org/3/';
    await fetch(`${baseUrl}${media}/${id}?language=pt-br`, options)
        .then(res => res.json())
        .then(res => movie = res)
        .catch(err => console.log('Erro ao carregar filme ', err));
    // console.log(movie);
    
    // Poster
    document.querySelector('.poster').src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

   
    movie.genres.forEach(genre => {
        detalhes.innerHTML += 
            `<button class='btn btn-lg btn-outline-light me-2 ${genre.name}'>
            ${genre.name}</button>`
    });


   
    let elencoContainer = document.querySelector('#elenco');
    elencoContainer.innerHTML = '';
    for (let i = 0; i < elenco.length; i++) {
        let foto = elenco[i].profile_path ? 
            `https://image.tmdb.org/t/p/original/${elenco[i].profile_path}`
            : 'img/no-photo-cast.png';
        elencoContainer.innerHTML +=
            `<div class='col-lg-4 col-sm-6'>
                <div class='row'>
                    <div class='col-lg-3 mb-3'>
                        <img class="w-100 rounded-3" src="${foto}">
                    </div>
                    <div class='col-lg-9 mb-3'>
                        <h4>${elenco[i].original_name}</h4>
                        <p>${elenco[i].character}</p>
                    </div>
                </div>
            </div>`;
    }

}