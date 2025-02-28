import { useEffect, useState } from "react";
import ApiComic from "../api/api";
import ApiFavorite from "features/favorite/api/api";
import HelpersComic from "../helpers/helpers";
import "../assets/Comic.css";
import {default as HG} from "helpers/helpers";
import { useNavigate } from "react-router-dom";


function Comic() {
  const [isLoading, setIsLoading] = useState(false);
  const [comicsResponse, setComicsResponse] = useState({});
  const [comics, setComics] = useState([]);
  const componentId = 'Comic';
  const navigate = useNavigate();

  useEffect(() => {
    
    if(!HG.isAuthorized()) {
        HG.showToast(componentId,'❕ Debe iniciar sesión para ver esta página');
        navigate('/auth');
    } else {
        fetchComic(0);
    }
  }, []);

    function fetchComic(offset) {
        setIsLoading(true);
        HG.jsonRequest({
            componentId,
            url: ApiComic.comic+`?offset=${offset}&email=${HG.userData.user.email}`,
            method: 'GET',
            successCodes: [200],
            success: (dataRes) => {
                setComicsResponse(dataRes.data);
                setComics(dataRes.data.results)
                console.log(comicsResponse) 
            },
            final: _ => setIsLoading(false)
        })
        
    }


    function anterior() {
        const offset = comicsResponse.offset;
        const count = comicsResponse.count;
        if(offset>0) {
            fetchComic(offset-count)
        }
    }

  function siguiente() {
    const offset = comicsResponse.offset;
    const count = comicsResponse.count;
    const total = comicsResponse.total;
    if(offset<(total-count)) {
        fetchComic(offset+count)
    }
  }

  function alternarFavorito(comic,index) {
    if(comic.esFavorito === false) { // agregar favorito
        HG.jsonRequest({
            componentId,
            url: ApiFavorite.favorite,
            method: 'POST',
            body:{
                email: HG.userData.user.email,
                comicId: comic.id,
                thumbnailPath: HelpersComic.CreateImgUrl(comic.thumbnail),
                textDetail: HelpersComic.CreateTooltip(comic.textObjects),
                urlDetailPage: HelpersComic.CreateLinkHref(comic.urls),
                title: comic.title
            },
            successCodes: [201],
            success: () => {
                const comicNew = comics.find(x => x.id===comic.id)
                comicNew.esFavorito = true;
                const comicsNew = [...comics];
                comicsNew[index] = comicNew;
                setComics(comicsNew);
                HG.showToast(componentId,'✅ El favorito ha sido agregado')
            }
        })
    }
    else { // quitar favorito
        HG.jsonRequest({
            componentId,
            url: ApiFavorite.favorite,
            method: 'DELETE',
            body:{
                email: HG.userData.user.email,
                comicId: comic.id
            },
            successCodes: [200],
            success: () => {
                const comicNew = comics.find(x => x.id===comic.id)
                comicNew.esFavorito = false;
                const comicsNew = [...comics];
                comicsNew[index] = comicNew;
                setComics(comicsNew);
                HG.showToast(componentId,'✅ El favorito ha sido quitado')
            }
        })
    }
  }


  return (
    <div id={componentId}>
        <h3 className="mb-4">Listado de Comics</h3>
        <div className="row">
            {
                isLoading ?
                    <>
                        <p>
                            Cargando comics.<br/>
                            Por favor espere unos segundos...
                        </p>
                        <hr/>
                    </>
                :
                comics.map((comic,i,all) => {
                    if(i===all.length-1) setTimeout(_ => HG.renderTooltips(componentId),100);
                    return (
                        <div key={comic.id} className="col col-sm-12 col-md-6 col-lg-4">
                            <a href={HelpersComic.CreateLinkHref(comic.urls)} target="_blank">
                                <img src={HelpersComic.CreateImgUrl(comic.thumbnail)} data-bs-toggle="tooltip" data-bs-title={HelpersComic.CreateTooltip(comic.textObjects)} data-bs-html="true" />
                            </a>
                            <p>
                                {comic.esFavorito ?
                                    <a className="link-favorito" onClick={_ => alternarFavorito(comic,i)} data-bs-toggle="tooltip" data-bs-title="Quitar de Mis Favoritos">⭐️ </a>
                                    :
                                    <a className="link-favorito" onClick={_ => alternarFavorito(comic,i)} data-bs-toggle="tooltip" data-bs-title="Agregar a Mis Favoritos">★ </a>
                                }
                                {comic.title}
                            </p>
                        </div>
                    )
                })
            }
        </div>
        <div>
            <div class="pagination">
                <a href="#" onClick={anterior} data-bs-toggle="tooltip" data-bs-title="Anterior">❮ Anterior</a>
                <a href="#" onClick={siguiente}>Siguiente ❯</a>
            </div>
        </div>

    </div>
  );
}



export default Comic;
