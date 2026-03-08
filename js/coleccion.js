// ============================================
// JOJO'S DESKTOP - COLECCION.JS
// Sistema de la colección completa de TODOS los volúmenes de manga
// ============================================

// ============================================
// CARGAR DATOS DESDE DATA.JSON
// ============================================
async function cargarDatos() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error cargando datos:', error);
        return null;
    }
}

// ============================================
// DATOS COMPLETOS DE TODOS LOS VOLÚMENES
// ============================================
const mangaVolumes = {
    "Phantom Blood": {
        year: "1987",
        volumes: [
            { number: 1, title: "Phantom Blood", cover: "https://static.wikia.nocookie.net/jojo/images/a/ae/Volumen_1.jpg/revision/latest?cb=20190206014954&path-prefix=es", date: "10/1987" },
            { number: 2, title: "Phantom Blood", cover: "https://static.jojowiki.com/images/thumb/f/f0/latest/20210406034318/Volume_2.jpg/400px-Volume_2.jpg", date: "12/1987" },
            { number: 3, title: "Phantom Blood", cover: "https://static.jojowiki.com/images/thumb/2/2a/latest/20210406034350/Volume_3.jpg/400px-Volume_3.jpg", date: "03/1988" },
            { number: 4, title: "Phantom Blood", cover: "https://static.jojowiki.com/images/thumb/c/ca/latest/20210406034423/Volume_4.jpg/400px-Volume_4.jpg", date: "06/1988" },
            { number: 5, title: "Phantom Blood", cover: "https://static.jojowiki.com/images/thumb/3/31/latest/20210406034454/Volume_5.jpg/400px-Volume_5.jpg", date: "09/1988" }
        ]
    },
    "Battle Tendency": {
        year: "1989",
        volumes: [
            { number: 6, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/2/28/latest/20210406034533/Volume_6.jpg/400px-Volume_6.jpg", date: "12/1988" },
            { number: 7, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/d/d5/latest/20210406034605/Volume_7.jpg/400px-Volume_7.jpg", date: "03/1989" },
            { number: 8, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/4/4f/latest/20210406034634/Volume_8.jpg/400px-Volume_8.jpg", date: "06/1989" },
            { number: 9, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/a/a5/latest/20210406034703/Volume_9.jpg/400px-Volume_9.jpg", date: "09/1989" },
            { number: 10, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/1/13/latest/20210406034732/Volume_10.jpg/400px-Volume_10.jpg", date: "12/1989" },
            { number: 11, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/6/61/latest/20210406034802/Volume_11.jpg/400px-Volume_11.jpg", date: "02/1990" },
            { number: 12, title: "Battle Tendency", cover: "https://static.jojowiki.com/images/thumb/c/c7/latest/20210406034831/Volume_12.jpg/400px-Volume_12.jpg", date: "04/1990" }
        ]
    },
    "Stardust Crusaders": {
        year: "1990",
        volumes: [
            { number: 13, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/b/b6/latest/20210406034908/Volume_13.jpg/400px-Volume_13.jpg", date: "07/1990" },
            { number: 14, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/0/0c/latest/20210406034939/Volume_14.jpg/400px-Volume_14.jpg", date: "10/1990" },
            { number: 15, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/a/a7/latest/20210406035012/Volume_15.jpg/400px-Volume_15.jpg", date: "12/1990" },
            { number: 16, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/3/34/latest/20210406035044/Volume_16.jpg/400px-Volume_16.jpg", date: "03/1991" },
            { number: 17, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/1/12/latest/20210406035116/Volume_17.jpg/400px-Volume_17.jpg", date: "06/1991" },
            { number: 18, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/9/94/latest/20210406035148/Volume_18.jpg/400px-Volume_18.jpg", date: "09/1991" },
            { number: 19, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/d/d7/latest/20210406035220/Volume_19.jpg/400px-Volume_19.jpg", date: "11/1991" },
            { number: 20, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/8/86/latest/20210406035251/Volume_20.jpg/400px-Volume_20.jpg", date: "01/1992" },
            { number: 21, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/d/d4/latest/20210406035321/Volume_21.jpg/400px-Volume_21.jpg", date: "04/1992" },
            { number: 22, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/a/a3/latest/20210406035354/Volume_22.jpg/400px-Volume_22.jpg", date: "07/1992" },
            { number: 23, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/7/79/latest/20210406035426/Volume_23.jpg/400px-Volume_23.jpg", date: "09/1992" },
            { number: 24, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/f/f2/latest/20210406035458/Volume_24.jpg/400px-Volume_24.jpg", date: "11/1992" },
            { number: 25, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/6/60/latest/20210406035530/Volume_25.jpg/400px-Volume_25.jpg", date: "01/1993" },
            { number: 26, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/d/d9/latest/20210406035602/Volume_26.jpg/400px-Volume_26.jpg", date: "03/1993" },
            { number: 27, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/a/a9/latest/20210406035635/Volume_27.jpg/400px-Volume_27.jpg", date: "05/1993" },
            { number: 28, title: "Stardust Crusaders", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406035707/Volume_28.jpg/400px-Volume_28.jpg", date: "07/1993" }
        ]
    },
    "Diamond is Unbreakable": {
        year: "1992",
        volumes: [
            { number: 29, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/0/00/latest/20210406035810/Volume_29.jpg/400px-Volume_29.jpg", date: "10/1993" },
            { number: 30, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/4/41/latest/20210406035839/Volume_30.jpg/400px-Volume_30.jpg", date: "12/1993" },
            { number: 31, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/5/5a/latest/20210406035907/Volume_31.jpg/400px-Volume_31.jpg", date: "02/1994" },
            { number: 32, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/d/d8/latest/20210406035936/Volume_32.jpg/400px-Volume_32.jpg", date: "04/1994" },
            { number: 33, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/2/2b/latest/20210406040004/Volume_33.jpg/400px-Volume_33.jpg", date: "06/1994" },
            { number: 34, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/d/d2/latest/20210406040033/Volume_34.jpg/400px-Volume_34.jpg", date: "09/1994" },
            { number: 35, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/0/0a/latest/20210406040102/Volume_35.jpg/400px-Volume_35.jpg", date: "11/1994" },
            { number: 36, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/c/ca/latest/20210406040132/Volume_36.jpg/400px-Volume_36.jpg", date: "01/1995" },
            { number: 37, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/6/6d/latest/20210406040201/Volume_37.jpg/400px-Volume_37.jpg", date: "03/1995" },
            { number: 38, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/9/9c/latest/20210406040231/Volume_38.jpg/400px-Volume_38.jpg", date: "05/1995" },
            { number: 39, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/3/3d/latest/20210406040300/Volume_39.jpg/400px-Volume_39.jpg", date: "07/1995" },
            { number: 40, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/5/5f/latest/20210406040328/Volume_40.jpg/400px-Volume_40.jpg", date: "09/1995" },
            { number: 41, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/6/60/latest/20210406040357/Volume_41.jpg/400px-Volume_41.jpg", date: "11/1995" },
            { number: 42, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/3/31/latest/20210406040426/Volume_42.jpg/400px-Volume_42.jpg", date: "01/1996" },
            { number: 43, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/a/a4/latest/20210406040454/Volume_43.jpg/400px-Volume_43.jpg", date: "03/1996" },
            { number: 44, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/6/68/latest/20210406040522/Volume_44.jpg/400px-Volume_44.jpg", date: "05/1996" },
            { number: 45, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/0/02/latest/20210406040551/Volume_45.jpg/400px-Volume_45.jpg", date: "07/1996" },
            { number: 46, title: "Diamond is Unbreakable", cover: "https://static.jojowiki.com/images/thumb/3/3d/latest/20191015213447/Volume_46.jpg/400px-Volume_46.jpg", date: "09/1996" }
        ]
    },
    "Vento Aureo": {
        year: "1995",
        volumes: [
            { number: 47, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/9/95/latest/20210406040713/Volume_47.jpg/400px-Volume_47.jpg", date: "12/1996" },
            { number: 48, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/e/e9/latest/20210406040743/Volume_48.jpg/400px-Volume_48.jpg", date: "02/1997" },
            { number: 49, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/6/60/latest/20210406040813/Volume_49.jpg/400px-Volume_49.jpg", date: "04/1997" },
            { number: 50, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/9/9f/latest/20210406040843/Volume_50.jpg/400px-Volume_50.jpg", date: "06/1997" },
            { number: 51, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/0/0d/latest/20210406040913/Volume_51.jpg/400px-Volume_51.jpg", date: "09/1997" },
            { number: 52, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/4/43/latest/20210406040943/Volume_52.jpg/400px-Volume_52.jpg", date: "11/1997" },
            { number: 53, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/a/a8/latest/20210406041013/Volume_53.jpg/400px-Volume_53.jpg", date: "01/1998" },
            { number: 54, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/f/f0/latest/20210406041044/Volume_54.jpg/400px-Volume_54.jpg", date: "03/1998" },
            { number: 55, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/2/2f/latest/20210406041115/Volume_55.jpg/400px-Volume_55.jpg", date: "05/1998" },
            { number: 56, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/9/9e/latest/20210406041146/Volume_56.jpg/400px-Volume_56.jpg", date: "07/1998" },
            { number: 57, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/c/c4/latest/20210406041217/Volume_57.jpg/400px-Volume_57.jpg", date: "09/1998" },
            { number: 58, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/5/52/latest/20210406041248/Volume_58.jpg/400px-Volume_58.jpg", date: "11/1998" },
            { number: 59, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/d/d3/latest/20210406041319/Volume_59.jpg/400px-Volume_59.jpg", date: "01/1999" },
            { number: 60, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/a/a2/latest/20210406041350/Volume_60.jpg/400px-Volume_60.jpg", date: "03/1999" },
            { number: 61, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/0/0d/latest/20210406041421/Volume_61.jpg/400px-Volume_61.jpg", date: "05/1999" },
            { number: 62, title: "Vento Aureo", cover: "https://static.jojowiki.com/images/thumb/3/31/latest/20210406041452/Volume_62.jpg/400px-Volume_62.jpg", date: "07/1999" },
            { number: 63, title: "Vento Aureo", cover: "https://static.wikia.nocookie.net/jojo/images/1/17/Volumen_63.jpg/revision/latest?cb=20190328214039&path-prefix=es", date: "10/1999" }
        ]
    },
    "Stone Ocean": {
        year: "1999",
        volumes: [
            { number: 64, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/6/69/latest/20210406041602/Volume_64.jpg/400px-Volume_64.jpg", date: "12/1999" },
            { number: 65, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/9/96/latest/20210406041633/Volume_65.jpg/400px-Volume_65.jpg", date: "02/2000" },
            { number: 66, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/9/94/latest/20210406041703/Volume_66.jpg/400px-Volume_66.jpg", date: "04/2000" },
            { number: 67, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/5/5f/latest/20210406041733/Volume_67.jpg/400px-Volume_67.jpg", date: "07/2000" },
            { number: 68, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/2/2a/latest/20210406041803/Volume_68.jpg/400px-Volume_68.jpg", date: "09/2000" },
            { number: 69, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/3/31/latest/20210406041833/Volume_69.jpg/400px-Volume_69.jpg", date: "11/2000" },
            { number: 70, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/a/a3/latest/20210406041903/Volume_70.jpg/400px-Volume_70.jpg", date: "01/2001" },
            { number: 71, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/9/96/latest/20210406041933/Volume_71.jpg/400px-Volume_71.jpg", date: "04/2001" },
            { number: 72, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406042003/Volume_72.jpg/400px-Volume_72.jpg", date: "07/2001" },
            { number: 73, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/2/29/latest/20210406042033/Volume_73.jpg/400px-Volume_73.jpg", date: "09/2001" },
            { number: 74, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/9/9e/latest/20210406042104/Volume_74.jpg/400px-Volume_74.jpg", date: "11/2001" },
            { number: 75, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/1/1d/latest/20210406042134/Volume_75.jpg/400px-Volume_75.jpg", date: "01/2002" },
            { number: 76, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/9/90/latest/20210406042204/Volume_76.jpg/400px-Volume_76.jpg", date: "04/2002" },
            { number: 77, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/c/c6/latest/20210406042234/Volume_77.jpg/400px-Volume_77.jpg", date: "07/2002" },
            { number: 78, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/3/3f/latest/20210406042304/Volume_78.jpg/400px-Volume_78.jpg", date: "09/2002" },
            { number: 79, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/thumb/9/9b/latest/20210406042335/Volume_79.jpg/400px-Volume_79.jpg", date: "11/2002" },
            { number: 80, title: "Stone Ocean", cover: "https://static.jojowiki.com/images/a/a6/latest/20191015214320/Volume_80.jpg", date: "02/2003" }
        ]
    },
    "Steel Ball Run": {
        year: "2004",
        volumes: [
            { number: 81, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/f/f5/latest/20210406042504/Volume_81.jpg/400px-Volume_81.jpg", date: "04/2004" },
            { number: 82, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/0/0c/latest/20210406042534/Volume_82.jpg/400px-Volume_82.jpg", date: "07/2004" },
            { number: 83, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/c/c0/latest/20210406042604/Volume_83.jpg/400px-Volume_83.jpg", date: "10/2004" },
            { number: 84, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406042634/Volume_84.jpg/400px-Volume_84.jpg", date: "12/2004" },
            { number: 85, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406042704/Volume_85.jpg/400px-Volume_85.jpg", date: "02/2005" },
            { number: 86, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/7/73/latest/20210406042734/Volume_86.jpg/400px-Volume_86.jpg", date: "04/2005" },
            { number: 87, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/c/c3/latest/20210406042804/Volume_87.jpg/400px-Volume_87.jpg", date: "07/2005" },
            { number: 88, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/2/24/latest/20210406042834/Volume_88.jpg/400px-Volume_88.jpg", date: "09/2005" },
            { number: 89, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/6/63/latest/20210406042904/Volume_89.jpg/400px-Volume_89.jpg", date: "11/2005" },
            { number: 90, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/d/d8/latest/20210406042934/Volume_90.jpg/400px-Volume_90.jpg", date: "01/2006" },
            { number: 91, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/c/c7/latest/20210406043004/Volume_91.jpg/400px-Volume_91.jpg", date: "04/2006" },
            { number: 92, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406043034/Volume_92.jpg/400px-Volume_92.jpg", date: "07/2006" },
            { number: 93, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/9/9e/latest/20210406043104/Volume_93.jpg/400px-Volume_93.jpg", date: "09/2006" },
            { number: 94, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/c/c3/latest/20210406043134/Volume_94.jpg/400px-Volume_94.jpg", date: "11/2006" },
            { number: 95, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/6/64/latest/20210406043204/Volume_95.jpg/400px-Volume_95.jpg", date: "01/2007" },
            { number: 96, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/d/d2/latest/20210406043234/Volume_96.jpg/400px-Volume_96.jpg", date: "04/2007" },
            { number: 97, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/e/e7/latest/20210406043304/Volume_97.jpg/400px-Volume_97.jpg", date: "06/2007" },
            { number: 98, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406043334/Volume_98.jpg/400px-Volume_98.jpg", date: "09/2007" },
            { number: 99, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/c/c0/latest/20210406043404/Volume_99.jpg/400px-Volume_99.jpg", date: "11/2007" },
            { number: 100, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/5/5f/latest/20210406043434/Volume_100.jpg/400px-Volume_100.jpg", date: "01/2008" },
            { number: 101, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/d/d4/latest/20210406043504/Volume_101.jpg/400px-Volume_101.jpg", date: "04/2008" },
            { number: 102, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/0/09/latest/20210406043534/Volume_102.jpg/400px-Volume_102.jpg", date: "07/2008" },
            { number: 103, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/thumb/0/0c/latest/20210406043604/Volume_103.jpg/400px-Volume_103.jpg", date: "10/2008" },
            { number: 104, title: "Steel Ball Run", cover: "https://static.jojowiki.com/images/2/24/latest/20240416031529/Volume_104.jpg", date: "02/2009" }
        ]
    },
    "JoJolion": {
        year: "2011",
        volumes: [
            { number: 105, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/9/99/latest/20210406043725/Volume_105.jpg/400px-Volume_105.jpg", date: "05/2011" },
            { number: 106, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/4/48/latest/20210406043755/Volume_106.jpg/400px-Volume_106.jpg", date: "08/2011" },
            { number: 107, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/a/a8/latest/20210406043825/Volume_107.jpg/400px-Volume_107.jpg", date: "11/2011" },
            { number: 108, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/f/ff/latest/20210406043855/Volume_108.jpg/400px-Volume_108.jpg", date: "02/2012" },
            { number: 109, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/5/55/latest/20210406043925/Volume_109.jpg/400px-Volume_109.jpg", date: "05/2012" },
            { number: 110, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/4/41/latest/20210406043955/Volume_110.jpg/400px-Volume_110.jpg", date: "08/2012" },
            { number: 111, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/9/94/latest/20210406044025/Volume_111.jpg/400px-Volume_111.jpg", date: "11/2012" },
            { number: 112, title: "JoJolion", cover: "https://static.jojowiki.com/images/f/f0/latest/20250101131855/Volume_112.jpg", date: "02/2013" },
            { number: 113, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/d/d2/latest/20210406044125/Volume_113.jpg/400px-Volume_113.jpg", date: "05/2013" },
            { number: 114, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/4/4c/latest/20210406044155/Volume_114.jpg/400px-Volume_114.jpg", date: "08/2013" },
            { number: 115, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/0/0e/latest/20210406044225/Volume_115.jpg/400px-Volume_115.jpg", date: "11/2013" },
            { number: 116, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/e/e3/latest/20210406044255/Volume_116.jpg/400px-Volume_116.jpg", date: "02/2014" },
            { number: 117, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/0/0c/latest/20210406044325/Volume_117.jpg/400px-Volume_117.jpg", date: "05/2014" },
            { number: 118, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/6/64/latest/20210406044355/Volume_118.jpg/400px-Volume_118.jpg", date: "08/2014" },
            { number: 119, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/2/2b/latest/20210406044425/Volume_119.jpg/400px-Volume_119.jpg", date: "11/2014" },
            { number: 120, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/c/c9/latest/20210406044455/Volume_120.jpg/400px-Volume_120.jpg", date: "02/2015" },
            { number: 121, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/3/31/latest/20210406044525/Volume_121.jpg/400px-Volume_121.jpg", date: "05/2015" },
            { number: 122, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/d/d9/latest/20210406044555/Volume_122.jpg/400px-Volume_122.jpg", date: "08/2015" },
            { number: 123, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/5/5f/latest/20210406044625/Volume_123.jpg/400px-Volume_123.jpg", date: "11/2015" },
            { number: 124, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/9/94/latest/20210406044655/Volume_124.jpg/400px-Volume_124.jpg", date: "02/2016" },
            { number: 125, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/4/40/latest/20210406044725/Volume_125.jpg/400px-Volume_125.jpg", date: "05/2016" },
            { number: 126, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/d/d2/latest/20210406044755/Volume_126.jpg/400px-Volume_126.jpg", date: "08/2016" },
            { number: 127, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/3/33/latest/20210406044825/Volume_127.jpg/400px-Volume_127.jpg", date: "12/2016" },
            { number: 128, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/9/9e/latest/20210406044855/Volume_128.jpg/400px-Volume_128.jpg", date: "04/2017" },
            { number: 129, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/f/fa/latest/20231218025436/Volume_129.jpg/400px-Volume_129.jpg", date: "02/2023" },
            { number: 130, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/0/0b/latest/20231218025530/Volume_130.jpg/400px-Volume_130.jpg", date: "07/2023" },
            { number: 131, title: "JoJolion", cover: "https://static.jojowiki.com/images/thumb/e/e6/latest/20231218025626/Volume_131.jpg/400px-Volume_131.jpg", date: "12/2023" }
        ]
    },
    "The JoJoLands": {
        year: "2023",
        volumes: [
            
            { number: 132, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/thumb/c/c9/latest/20240517023240/Volume_132.jpg/400px-Volume_132.jpg", date: "05/2024" },
            { number: 133, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/thumb/a/a5/latest/20241017022636/Volume_133.jpg/400px-Volume_133.jpg", date: "10/2024" },
            { number: 134, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/thumb/5/5c/latest/20250321030515/Volume_134.jpg/400px-Volume_134.jpg", date: "03/2025" },
            { number: 135, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/thumb/9/94/latest/20250613031159/Volume_135.jpg/400px-Volume_135.jpg", date: "06/2025" },
            { number: 136, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/thumb/0/09/latest/20250919022659/Volume_136.jpg/400px-Volume_136.jpg", date: "09/2025" },
            { number: 137, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/thumb/8/82/latest/20251218030428/Volume_137.jpg/400px-Volume_137.jpg", date: "12/2025" },
            { number: 138, title: "The JoJoLands", cover: "https://static.jojowiki.com/images/e/e8/latest/20251218030928/Volume_138.jpg", date: "03/2026" }
        ]
    }
};

// ============================================
// GENERACIÓN DE VOLÚMENES ORGANIZADOS POR PARTES
// ============================================
function generarColeccionVolumes() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Orden de las partes
    const ordenPartes = [
        "Phantom Blood",
        "Battle Tendency", 
        "Stardust Crusaders",
        "Diamond is Unbreakable",
        "Vento Aureo",
        "Stone Ocean",
        "Steel Ball Run",
        "JoJolion",
        "The JoJoLands"
    ];

    // Generar cada parte con sus volúmenes
    ordenPartes.forEach((parte, index) => {
        const parteData = mangaVolumes[parte];
        if (!parteData) return;

        // Crear encabezado de sección
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'part-section-header';
        sectionHeader.innerHTML = `
            <h2 class="part-title">Parte ${index + 1}: ${parte}</h2>
            <span class="part-volume-count">${parteData.volumes.length} volúmenes</span>
        `;
        grid.appendChild(sectionHeader);

        // Crear grid para esta parte
        const partGrid = document.createElement('div');
        partGrid.className = 'part-grid';
        
        // Generar volúmenes de esta parte
        parteData.volumes.forEach(volume => {
            const card = document.createElement('div');
            card.className = 'volume-card';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'listitem');
            card.setAttribute('aria-label', `Volumen ${volume.number}: ${volume.title}`);

            card.innerHTML = `
                <div class="volume-cover">
                    <img src="${volume.cover}" alt="Volumen ${volume.number}" loading="lazy">
                    <div class="volume-number">#${volume.number}</div>
                </div>
                <div class="volume-info">
                    <h3 class="volume-title">${volume.title}</h3>
                    <p class="volume-date">📅 ${volume.date}</p>
                </div>
            `;

            // Evento click para modal
            card.addEventListener('click', () => openVolumeModal(volume, parte));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openVolumeModal(volume, parte);
                }
            });

            partGrid.appendChild(card);
        });

        grid.appendChild(partGrid);
    });
}

// ============================================
// MODAL DE VOLUMEN
// ============================================
function initVolumeModal() {
    const modal = document.getElementById('collection-modal');
    if (!modal) return;

    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    window.openVolumeModal = function(volume, parte) {
        const modalTitle = document.getElementById('modal-title');
        const modalImage = document.getElementById('modal-image');
        const modalSummary = document.getElementById('modal-summary');
        const modalDetails = document.getElementById('modal-details');
        const modalActions = document.getElementById('modal-actions');

        modalTitle.textContent = `Volumen ${volume.number}`;
        modalImage.src = volume.cover;
        modalImage.alt = `Portada del volumen ${volume.number}`;
        
        // Información del volumen
        const parteCompleta = {
            "Phantom Blood": "Parte 1: Phantom Blood",
            "Battle Tendency": "Parte 2: Battle Tendency",
            "Stardust Crusaders": "Parte 3: Stardust Crusaders",
            "Diamond is Unbreakable": "Parte 4: Diamond is Unbreakable",
            "Vento Aureo": "Parte 5: Vento Aureo",
            "Stone Ocean": "Parte 6: Stone Ocean",
            "Steel Ball Run": "Parte 7: Steel Ball Run",
            "JoJolion": "Parte 8: JoJolion",
            "The JoJoLands": "Parte 9: The JoJoLands"
        };

        modalSummary.textContent = `${volume.title} - ${parteCompleta[parte] || parte}`;
        
        modalDetails.innerHTML = `
            <div class="modal-detail-item">
                <div class="modal-detail-label">Volumen</div>
                <div class="modal-detail-value">#${volume.number}</div>
            </div>
            <div class="modal-detail-item">
                <div class="modal-detail-label">Parte</div>
                <div class="modal-detail-value">${parte}</div>
            </div>
            <div class="modal-detail-item">
                <div class="modal-detail-label">Fecha</div>
                <div class="modal-detail-value">${volume.date}</div>
            </div>
            <div class="modal-detail-item">
                <div class="modal-detail-label">Título</div>
                <div class="modal-detail-value">${volume.title}</div>
            </div>
        `;
        
        modalActions.innerHTML = `
            <a href="partes.html?part=${encodeURIComponent(parte)}" class="view-part-btn">
                Ver Parte Completa
            </a>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => modalClose.focus(), 100);
    };

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ============================================
// ACTUALIZAR ESTADÍSTICAS
// ============================================
function actualizarEstadisticas() {
    let totalVolumes = 0;
    
    Object.keys(mangaVolumes).forEach(parte => {
        totalVolumes += mangaVolumes[parte].volumes.length;
    });

    const totalVolumesEl = document.getElementById('stat-volumes');
    const totalParts = document.getElementById('stat-parts');

    if (totalVolumesEl) totalVolumesEl.textContent = totalVolumes;
    if (totalParts) totalParts.textContent = '9';
}

// ============================================
// SISTEMA DE PARTÍCULAS
// ============================================
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                speedY: Math.random() * 0.5 + 0.1,
                speedX: (Math.random() - 0.5) * 0.3,
                color: Math.random() > 0.5 ? '#e91e63' : '#9c27b0'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            
            particle.y -= particle.speedY;
            particle.x += particle.speedX;
            
            if (particle.y < 0) {
                particle.y = canvas.height;
                particle.x = Math.random() * canvas.width;
            }
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
        });

        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#e91e63';
                    ctx.globalAlpha = (1 - distance / 150) * 0.15;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        resizeCanvas();
        createParticles();
        drawParticles();
    } else {
        ctx.fillStyle = '#070707';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
function inicializarPagina() {
    initVolumeModal();
    initParticles();
    generarColeccionVolumes();
    actualizarEstadisticas();
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarPagina);

