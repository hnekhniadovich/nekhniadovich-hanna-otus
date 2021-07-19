const maxItemAssociation = (products) => {
    if(!products || !products.length) {
        return null
    }

    const associations = []

    let isVisited

    for(let i = 0; i < products.length; i++) {
        isVisited = false
        if(!associations.length) {   
            associations.push(new Set(products[i]))
        }
        else {
            for(let set of associations) {
                for(let item of products[i]) {
                    if(set.has(item)) {
                        isVisited = true
                        products[i].forEach(item => set.add(item))
                    }
                }
            }
            if(!isVisited) {
                associations.push(new Set(products[i]))
            }
        }
    }

    const sortedAssociations = associations.map(el => [...el].sort())
    sortedAssociations.sort()

    let max = 0
    let maxAssociation


    for(let y = 0; y < sortedAssociations.length; y++) {
        if(sortedAssociations[y].length > max) {
            max = sortedAssociations[y].length
            maxAssociation = sortedAssociations[y]
        }
    }

    return maxAssociation
}





