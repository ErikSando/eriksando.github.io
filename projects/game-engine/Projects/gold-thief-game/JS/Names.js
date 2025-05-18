function RandomName(gender) {
    return Random.Choice(Names[gender]);
}

const Names = {
    "Male": [
        "Adam","Adelard","Aglovale","Aimery","Alphonse","Alan","Albert","Aldred","Alexander","Alisander","Amaury","Amis","Anselm","Arnold","Arthur",
        "Balin","Bartholomew","Bardolph","Barnabas","Basil","Baudwin","Bennet","Berenger","Bernard","Bertram","Bliant","Blaise","Brom","Bryce",
        "Castor","Charles","Cerdic","Cyr",
        "Daniel","David","Denis","Dinadan","Diggory","Drogo",
        "Edwin","Elias","Eliot","Eluard","Emory","Eustace","Everard",
        "Faramond","Frederick","Fulke",
        "Gabriel","Galleron","Gamel","Gareth","Geoffrey","George","Gerald","Gerard","Gervase","Gilbert","Giles","Godwin","Godwyn","Gregory","Griffith","Griffen","Gryffen","Gunter","Guy",
        "Hamon","Hamond","Hardwin","Hector","Henry","Herbert","Herman","Hildebrand","Hubert","Humphrey","Hugh",
        "Isaac","Ingram","Isembard","Ives",
        "James","Jasper","Jeremy","Jocelyn","Johan","Jordan","Joseph",
        "Lambert","Laurence","Leofwin","Lionel","Lucan","Lucius","Luke",
        "Mabon","Manfred","Mark","Martin","Matthew","Maynard","Merek","Meriet","Michael","Miles","Milo",
        "Nicholas","Nigel","Noah",
        "Osric","Ogier",
        "Paul","Percival","Peter","Philip","Piers",
        "Randel","Ranulf","Reginald","Richard","Robert","Roger","Roland","Rolf","Rowan",
        "Sampson","Sayer","Sebastian","Solomon",
        "Theobald","Thomas","Thurstan","Timm","Tobias","Tristram","Turstin",
        "Ulric","Urian",
        "Walter","Warin","Warner","William","Wolfstan","Wymond"
    ],

    "Female": [
        "Adelina","Agnes","Althea","Alma","Anais","Acelina","Aelina","Aldith","Alice","Alis","Alyson","Amicia","Amelina","Anne","Artemisia","Athelina","Audrey","Audry","Augusta","Avina",
        "Barbetta","Beatrice","Berta","Bertha","Blanche","Brangwine","Bridget",
        "Caesaria","Cassandra","Catelin","Cateline","Caterina","Cecily","Cicily","Celestria","Constance","Clare","Clarice","Christina","Cristina",
        "Dameta","Delia","Dionisia","Douglas",
        "Edeva","Edith","Eglenti","Elle","Elaine","Eleanor","Eva","Elizabeth","Elysande","Emeline","Emelye","Emma","Evaine","Evelune",
        "Felicia","Florence","Floria",
        "Genevieve","Gisela","Giselle","Gracia","Gratia","Guinevere","Gundred","Gwendolen",
        "Helewisa","Helewise",
        "Ida","Ingerid","Ingerith","Isabella","Isabeau","Isemay","Isolda","Ivette",
        "Joan","Johanna","Joyce","Joya","Juliana","Justina",
        "Laudine","Lavina","Lavena","Letia","Leticia","Legarda","Lia","Lillian","Lena","Linota","Lucia","Lovota","Lunete",
        "Magdalen","Margaret","Margery","Martha","Mary","Molly","Maria","Marie","Marian","Marion","Mathild","Mathilde","Matilda","Maud","Maude","Miriel","Muriel","Mirielda","Milicent","Milisant",
        "Nesta","Nicola",
        "Odelina","Oliva","Orella",
        "Paulina","Petronilla",
        "Regina","Richolda","Ricolda","Roana","Rosa","Rosamund",
        "Sabina","Sapphira","Sarah","Sela","Sophronia","Susanna","Swanhild","Sybil",
        "Tephania","Theda","Thora",
        "Venetia","Viviane",
        "Ysmeina","Ysmeine"
    ]
}