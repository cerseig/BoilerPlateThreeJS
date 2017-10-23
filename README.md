# Three.js Boilerplate

## Setup

* Execute `npm install`

## Environments

* Development `npm start`
* Production `npm run build`
# BoilerPlateThreeJS


MeshBasicMaterial : color
MeshLambertMaterial : color + emissive (ombre / diffusion)
MeshPhongMaterial : color + emissive + shininess (glossy effect)
MeshStandardMaterial : color + roughness + metalness

Attributes :
 - opacity
 - wireframe
 - shading

#TEXTURES
NormalMap : donner l'impression que la surface est en relief
EnvironmentMap : donner un reflet à l'objet
LightMap : donner un effet de lumière sans  en ajouter (limite niveau lumière)

#LIGHT
AmbiantLight : lumière de base, pas de relief
DirectionalLight : s'applique de manière homogène sur une zone plate
PointLight : se balade autour de l'objet
SpotLight : comme un spot
