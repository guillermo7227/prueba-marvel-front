const HelpersComic = {
    CreateImgUrl: function(imageObject) {
        return `${imageObject.path}/portrait_incredible.${imageObject.extension}`;
    },
    CreateLinkHref: function(links) {
        if (links.length === 0) return '';
        for (let i = 0; i < links.length; i++) {
            if (links[i].type==='detail') return links[i].url;            
        }
        return '';
    },
    CreateTooltip: function(textObjects) {
        if (textObjects.length === 0) return 'No hay descripción';
        for (let i = 0; i < textObjects.length; i++) {
            if (textObjects[i].type==='issue_solicit_text') 
                return textObjects[i].text.substring(0,300)+"...<br/>[Click para mas detalles]";            
        }
        return 'No hay descripción';
    }
}

export default HelpersComic;