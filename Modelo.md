# Modelo

## No normalizado

Clientes

| codigo | nombres y apellidos | razón social  |    ruc     |  direccion   | telefono |      email      | editar |
| :----: | :-----------------: | :-----------: | :--------: | :----------: | :------: | :-------------: | :----: |
|   00   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |
|   01   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |
|   02   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |
|   03   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |
|   04   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |
|   05   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |
|   06   |      John Doe       | Company, S.A. | 1938472819 | Green Street | 25894562 | doe@company.com |        |

Productos

| codigo |  imagen   | deporte  $^{1}$ | modelo  $^{1}$ | sexo  $^{1}$ | tela  $^{1}$ | talla  $^{1}$ | costo_T | costo_a |    descripcion    |
| :----: | :-------: | :-------------: | :------------: | :----------: | :----------: | :-----------: | :-----: | :-----: | :---------------: |
|   01   | image.com |     soccer      |      one       |     male     |     line     |     larga     |   150   |   150   | Some soccer cloth |
|   02   | image.com |     soccer      |      one       |     male     |     line     |     larga     |   150   |   150   | Some soccer cloth |
|   03   | image.com |     soccer      |      one       |     male     |     line     |     larga     |   150   |   150   | Some soccer cloth |
|   04   | image.com |     soccer      |      one       |     male     |     line     |     larga     |   150   |   150   | Some soccer cloth |
|   05   | image.com |     soccer      |      one       |     male     |     line     |     larga     |   150   |   150   | Some soccer cloth |
|   06   | image.com |     soccer      |      one       |     male     |     line     |     larga     |   150   |   150   | Some soccer cloth |

>  $^{1}$: Modelo no normalizado

Cotización

| codigo | item  | cantidad |         detalle  $^{2}$         | marca  $^{2}$ | modelo  $^{2}$ | precio_u  $^{2}$ | sub_total | delete |
| :----: | :---: | :------: | :-----------------------------: | :-----------: | :------------: | :--------------: | :-------: | :----: |
|   01   |   1   |    40    | Some detail of de current cuote |   soccerize   |      one       |       150        |    150    |        |
|   02   |   1   |    40    | Some detail of de current cuote |   soccerize   |      one       |       150        |    150    |        |
|   03   |   1   |    40    | Some detail of de current cuote |   soccerize   |      one       |       150        |    150    |        |
|   04   |   1   |    40    | Some detail of de current cuote |   soccerize   |      one       |       150        |    150    |        |
|   05   |   1   |    40    | Some detail of de current cuote |   soccerize   |      one       |       150        |    150    |        |
|   06   |   1   |    40    | Some detail of de current cuote |   soccerize   |      one       |       150        |    150    |        |

>  $^{2}$: Llave foránea a Productos

Detalle cotización

|  id   | id_cliente | id_producto | cantidad |
| :---: | :--------: | :---------: | :------: |
|  01   |     02     |     01      |    15    |
|  02   |     02     |     02      |    15    |
|  03   |     02     |     03      |    15    |
|  04   |     01     |     01      |    15    |
|  05   |     01     |     03      |    15    |

## Normalizada

Deporte

|  id   |  nombre  |
| :---: | :------: |
|  00   |  soccer  |
|  01   | baseball |
|  02   |  tenis   |
|  03   |  rally   |

Modelo

|  id   | nombre |
| :---: | :----: |
|  00   |  one   |
|  01   |  two   |
|  02   | three  |
|  03   |  four  |

Sexo

|  id   | nombre_corto | nombre_largo |
| :---: | :----------: | :----------: |
|  00   |      m       |     male     |
|  01   |      f       |    female    |

Tela

|  id   | nombre |
| :---: | :----: |
|  01   |  seda  |
|  02   |  lino  |
|  03   | cotton |

Talla

|  id   | nombre_corto | nombre_largo |
| :---: | :----------: | :----------: |
|  01   |      s       |    small     |
|  02   |      m       |    medium    |
|  03   |      l       |    large     |
|  04   |      xl      | extra large  |