INSERT INTO `province` (`name`) VALUES ('Guanacaste');
INSERT INTO `province` (`name`) VALUES ('Alajuela');
INSERT INTO `province` (`name`) VALUES ('Puntarenas');
INSERT INTO `province` (`name`) VALUES ('Limón');
INSERT INTO `province` (`name`) VALUES ('San José');
INSERT INTO `province` (`name`) VALUES ('Cartago');
INSERT INTO `province` (`name`) VALUES ('Heredia');

INSERT INTO `canton` (`name`, `province_id`) VALUES ('Liberia', 1);
INSERT INTO `canton` (`name`, `province_id`) VALUES ('La Cruz', 1);

INSERT INTO `district` (`name`, `canton_id`) VALUES ('Nacascolo', 1);
INSERT INTO `district` (`name`, `canton_id`) VALUES ('Santa Elena', 2);

INSERT INTO `site` (`id`, `name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES (NULL, 'El Monumento', NULL, 'Uso de la brújula (la aplicación muestra los pasos a seguir para el uso de la misma).', 'Desde este punto se pueden observar volcanes de la Cordillera Volcánica de Guanacaste. El volcán Orosí (N48°E), el volcán Cacao (N60°E) y el volcán Rincón de la Vieja (N90°E).\r\nHacia el azimut 110° (Sureste) se observa el cerro Góngora que es un domo volcánico con una edad de unos 8 millones de años. Un domo de lava se forma cuando sale lava muy densa o viscosa, que no puede fluir y se enfría. Queda como una protuberancia del terreno.\r\nLigeramente a la derecha del cerro Góngora se observan protuberancias del terreno más pequeñas que corresponden con los domos de Cañas Dulces, que fueron domos que se formaron por erupciones de lava que ocurrieron hace unos 1.5 millones de años.\r\nEl participante en este juego está ubicado sobre la Meseta de Ignimbrita, que es una planicie formada por una serie de erupciones volcánicas violentas que cubrieron la topografía existente hace unos 2 millones de años. Las ignimbritas son flujos de fragmentos volcánicos que se depositaron violentamente, después de la explosión de un volcán. En este caso rellenaron la topografía existente y dejaron una planicie (Meseta de ignimbritas).\r\nDesde este punto se puede observar la península de Santa Elena al Noroeste. El cerro El Inglés es uno de los puntos más altos de la península de Santa Elena con más de 500 m de altura). \r\nDesde este sitio lo puede observar hacia el Noroeste (305°), que está compuesta por rocas provenientes del manto terrestre (acá lo lleva a la figura 1c). \r\nEs decir, rocas que viajaron desde más de 40 kilómetros para llegar a la superficie terrestre. Estas rocas son más antiguas que 80 millones de años. ', '10.8341667', '-85.61138888888888', 1);
INSERT INTO `site` (`id`, `name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES (NULL, 'La Casona', NULL, 'Acceso con automóvil.', 'La Casona está edificada sobre rocas de la meseta ignimbrítica de unos 2 millones de años de antiguedad. Específicamente en este sitio, estas rocas contienen fragmentos de lava negruscos, que se llaman escorias caracterizadas por contener muchos poros, que fueron cavidades que contenían gases volcánicos cuando se formaron.', '10.8336111', '-85.6125', 1);
INSERT INTO `site` (`id`, `name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES (NULL, 'La Discordancia de La Cortina', NULL, 'Bajando la cuesta de La Cortina.\r\nEs un sitio de difícil parqueo. \r\nDebe parquear el vehículo en un sitio seguro y caminar hacia la discordancia.', 'Una discordancia angular es una superficie que representa una roca más joven, depositada sobre una más antigua que ha sido deformada y erosionada. Ver esquema. \r\nEn esta discordancia se tienen rocas sedimentarias de una edad de unos 30 millones de años, que se formaron en el lecho marino, se hicieron roca y posteriormente se deformaron y salieron a la superficie terrestre. La erosión aplanó la topografía y posteriormente fue cubierta por rocas producidas por una violenta erupción volcánica hace unos 2 millones de años.\r\nEl calor del depósito volcánico (ignimbrita) quemó el suelo antiguo (paleosuelo). ', '10.9477778', '-85.65611111111112', 2);

INSERT INTO `rally` (`id`, `name`, `points_awarded`, `image_url`, `description`, `latitude`, `longitude`) VALUES (NULL, 'Recorrido por Guanacaste', '500', NULL, 'Los rallies abarcan parte del Área de Conservación Guanacaste, los pueblos de Cuajiniquil y La Cruz y sitios cercanos, comprendiendo rocas con edades de 30 millones de años (Oligoceno) a la actualidad (Cuaternario). Además, algunos de estos territorios son declarados Patrimonio de la Humanidad (UNESCO, 1999, id N°928).\r\nEl noroeste de Costa Rica se diferencia por sus amplios paisajes geológicos, que dan paso al desarrollo de gran biodiversidad de la fauna y flora. El empleo de los recursos naturales en parques nacionales es de preponderancia para la divulgación, la educación y el turismo local.\r\nLa ampliación de la oferta económica en la zona es de gran apoyo para las actividades locales, basadas principalmente en la pesca. A partir del geoturismo se promueven: la recreación educativa y cultural, generación de empleo y la concientización acerca del rescate de valores patrimoniales, teniendo como base la geología y demás ciencias sustentadas a través de esta.', '10.9477778', '-85.65611111111112');

INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('1', '1');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('1', '2');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('1', '3');

INSERT INTO `users` (`id`, `api_id`, `username`, `first_name`, `last_name`, `email`, `photo_url`, `is_admin`, `login_api`) VALUES (NULL, '123456789123456', 'alan', 'Alan', 'Calderón', 'alan.calderon@ucr.ac.cr', NULL, b'0', 0);
INSERT INTO `users` (`id`, `api_id`, `username`, `first_name`, `last_name`, `email`, `photo_url`, `is_admin`, `login_api`) VALUES (NULL, '654321987654321', 'pablo', 'Juan Pablo', 'Solano', 'juan.solano@ucr.ac.cr', NULL, b'1', 0);

INSERT INTO `competition` (`id`, `is_active`, `starting_date`, `finishing_date`, `is_public`, `admin_id`, `description`, `Name`, `rally_id`) VALUES (NULL, b'1', CURRENT_TIMESTAMP, NULL, b'1', '1', 'The best rally ever', 'Test competition', '1');

INSERT INTO `rally` (`id`, `name`, `points_awarded`, `image_url`, `description`, `latitude`, `longitude`) VALUES (NULL, 'Recorrido Cuajiniquil', '650', NULL, 'Los rallies abarcan parte del Área de Conservación Guanacaste, los pueblos de Cuajiniquil y La Cruz y sitios cercanos, comprendiendo rocas con edades de 30 millones de años (Oligoceno) a la actualidad (Cuaternario). Además, algunos de estos territorios son declarados Patrimonio de la Humanidad (UNESCO, 1999, id N°928).\r\nEl noroeste de Costa Rica se diferencia por sus amplios paisajes geológicos, que dan paso al desarrollo de gran biodiversidad de la fauna y flora. El empleo de los recursos naturales en parques nacionales es de preponderancia para la divulgación, la educación y el turismo local.\r\nLa ampliación de la oferta económica en la zona es de gran apoyo para las actividades locales, basadas principalmente en la pesca. A partir del geoturismo se promueven: la recreación educativa y cultural, generación de empleo y la concientización acerca del rescate de valores patrimoniales, teniendo como base la geología y demás ciencias sustentadas a través de esta.', '10.635', '-85.4377');

INSERT INTO `site`(`name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES ('Playa Rajada',null,'Para ir a este punto puede hacerlo en cualquier tipo de vehículo.','Va encontrar rocas sedimentarias de una edad de 35 millones de años, en un fondo marino de menos de 200 m de profundidad.',11.015678,-85.724559,2);
INSERT INTO `site`(`name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES ('Isla Bolaños',null,'Para ir a este punto debe alquilar una lancha.','Desde el poblado de Cuajiniquil va a tener una linda experiencia y un recorrido a través de un paisaje geológico muy interesante.',11.0253,-85.4231,2);
INSERT INTO `site`(`name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES ('La Cruz',null,'Para ir a este punto se puede ir en cualquier tipo de vehículo.','Va a tener una vista espectacular del pliegue sinclinal de bahía Salinas.',11.04,-85.38,2);
INSERT INTO `site`(`name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES ('Islas Murciélgo',null,'Para ir a este punto se debe alquilar un servicio de lancha desde el poblado de Cuajiniquil y así podrá visitar también el punto 6.','Se recomienda consultar las condiciones del tiempo, pues esta zona es afectada por fuertes vientos entre diciembre y mayo.',10.8547,-85.9308,2);
INSERT INTO `site`(`name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES ('Playa Blanca',null,'Depende del tiempo es muy difícil desembarcar en esta playa.','Se puede visitar vía terrestre en vehículo de doble tracción, pero únicamnete durante la estación seca.',10.2012,-85.5103,2);
INSERT INTO `site`(`name`, `qr_url`, `details`, `description`, `latitude`, `longitude`, `district_id`) VALUES ('Bahía Santa Elena',null,'El ingreso a este sitio es por lancha, desde Cuajiniquil.','Este sitio se presta para hacer norkeling.',10.9246,-85.8044,2);

INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('2', '4');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('2', '5');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('2', '6');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('2', '7');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('2', '8');
INSERT INTO `rally_site` (`rally_id`, `site_id`) VALUES ('2', '9');