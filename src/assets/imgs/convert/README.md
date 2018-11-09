# tileTwo est la tuile de base
# tileOne est la montagne
# tilePirate est la tuile de base + texture


# Pour les montagnes
convert tileOne.png tileTwo.png mask2.png -composite mask_over_mountains.png

# Pour l'image pirate
convert tileTwo.png tilePirate.png mask4.png -composite tilePirate.png

# Attention convert modifie l'image source même si le mask est complètement blanc
# Il faut donc tricher et réécrire 'tileTwo' avec un masque blanc
# Et il faut faire cette opération à la fin pour ne pas contaminer la tuile 
# qui sert dans les autres images 'agrégées'
convert tileOne.png tileTwo.png mask4.png -composite tileTwo.png

