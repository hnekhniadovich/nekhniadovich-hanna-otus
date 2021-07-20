const maxItemAssociation = (products) => {
    if(!products || !products.length) {
        return null
    }

    const sortedProducts = products.map(el => el.sort())
    sortedProducts.sort()

    const associations = []

    let isVisited

    for(let i = 0; i < sortedProducts.length; i++) {
        isVisited = false
        if(!associations.length) {   
            associations.push(new Set(sortedProducts[i]))
        }
        else {
            for(let set of associations) {
                for(let item of sortedProducts[i]) {
                    if(set.has(item)) {
                        isVisited = true
                        sortedProducts[i].forEach(item => set.add(item))
                    }
                }
            }
            if(!isVisited) {
                associations.push(new Set(sortedProducts[i]))
            }
        }
    }

    let max = 0
    let maxAssociation

    for(let y = 0; y < associations.length; y++) {
        if(associations[y].size > max) {
            max = associations[y].size
            maxAssociation = associations[y]
        }
    }

    return [...maxAssociation].sort()
}



