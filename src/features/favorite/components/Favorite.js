import {default as HG} from "helpers/helpers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiFavorite from "../api/api";
import HelpersComic from "features/comic/helpers/helpers";

function Favorite() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [favoritesResponse, setFavoritesResponse] = useState({});
    const [favorites, setFavorites] = useState([]);
    const componentId = 'Favorite';

    useEffect(() => {

        if(!HG.isAuthorized()) {
            HG.showToast(componentId,'❕ Debe iniciar sesión para ver esta página');
            navigate('/auth');
        }else {
            fetchFavorites();
        }
    }, [])


    function fetchFavorites() {
        setIsLoading(true);
        console.log('api',ApiFavorite.favorite+'?email='+HG.userData.user.email)
        HG.jsonRequest({
            componentId,
            url: ApiFavorite.favorite+'?email='+HG.userData.user.email,
            method: 'GET',
            successCodes: [200],
            success: (dataRes) => {
                // setFavoritesResponse(dataRes.data);
                setFavorites(dataRes.data)
                console.log('res',favoritesResponse,dataRes) 
            },
            final: _ => setIsLoading(false)
        })
        
    }


  function quitarFavorito(comic,index) {

        if (window.confirm(`¿Desea eliminar ${comic.title} de sus favoritos?`)===true) {
            HG.jsonRequest({
                componentId,
                url: ApiFavorite.favorite,
                method: 'DELETE',
                body:{
                    email: HG.userData.user.email,
                    comicId: comic.comicId
                },
                successCodes: [200],
                success: () => {
                    const favoritesNew = [...favorites].filter(x => x.id!==comic.id);
                    setFavorites(favoritesNew);
                    HG.showToast(componentId,'✅ El favorito ha sido quitado')
                }
            })
        }
    }
    
    return(
        <div id={componentId}>
            <h3 className="mb-4">Mis Favoritos</h3>
            <div className="row">
            {
                isLoading ?
                    <>
                        <p>
                            Cargando favoritos.<br/>
                            Por favor espere unos segundos...
                        </p>
                        <hr/>
                    </>
                :
                favorites.map((favorite,i,all) => {
                    if(i===all.length-1) setTimeout(_ => HG.renderTooltips(componentId),100);
                    return (
                        <div key={favorite.id} className="col col-sm-12 col-md-6 col-lg-4">
                            <a href={favorite.urlDetailPage} target="_blank">
                                <img src={favorite.thumbnailPath} data-bs-toggle="tooltip" data-bs-title={favorite.textDetail} data-bs-html="true" />
                            </a>
                            <p>
                                {!favorite.esFavorito ?
                                    <a className="link-favorito" onClick={_ => quitarFavorito(favorite,i)} data-bs-toggle="tooltip" data-bs-title="Quitar de Mis Favoritos">⭐️ </a>

                                :''}
                                {favorite.title}
                            </p>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default Favorite;