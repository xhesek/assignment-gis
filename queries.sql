-- POUZITE QUERIES V PROJEKTE

EXPLAIN
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point 
	WHERE amenity LIKE 'bank' 
	AND name IS NOT NULL
UNION SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_polygon 
	WHERE amenity LIKE 'bank' 
	AND name IS NOT NULL
	
"HashAggregate  (cost=110893.27..110895.80 rows=253 width=96)"
"  Group Key: (st_asgeojson(st_transform(planet_osm_polygon.way, 4326), 15, 0)), planet_osm_polygon.name, planet_osm_polygon.tags"
"  ->  Gather  (cost=1000.00..110891.38 rows=253 width=96)"
"        Workers Planned: 2"
"        ->  Parallel Append  (cost=0.00..109866.08 rows=253 width=96)"
"              ->  Parallel Seq Scan on planet_osm_polygon  (cost=0.00..97276.66 rows=1 width=92)"
"                    Filter: ((name IS NOT NULL) AND (amenity ~~ 'bank'::text))"
"              ->  Parallel Seq Scan on planet_osm_point  (cost=0.00..12585.62 rows=105 width=109)"
"                    Filter: ((name IS NOT NULL) AND (amenity ~~ 'bank'::text))"

--OPT
EXPLAIN
SELECT * FROM banky_point
UNION SELECT * FROM banky_polygon

"HashAggregate  (cost=64.66..72.85 rows=819 width=128)"
"  Group Key: banky_point.result, banky_point.name, banky_point.tags, banky_point.way"
"  ->  Append  (cost=0.00..56.47 rows=819 width=128)"
"        ->  Seq Scan on banky_point  (cost=0.00..33.32 rows=732 width=164)"
"        ->  Seq Scan on banky_polygon  (cost=0.00..10.87 rows=87 width=825)"

------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPLAIN
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point 
	WHERE amenity LIKE 'bank' 
AND (name LIKE '' OR name LIKE 'ČSOB%' OR name LIKE 'Tatra banka%' OR name LIKE 'VUB%' OR name LIKE 'Prima banka%')
	
"Gather  (cost=1000.00..15988.31 rows=1 width=109)"
"  Workers Planned: 2"
"  ->  Parallel Seq Scan on planet_osm_point  (cost=0.00..14988.21 rows=1 width=109)"
"        Filter: ((amenity ~~ 'bank'::text) AND ((name ~~ ''::text) OR (name ~~ 'ČSOB%'::text) OR (name ~~ 'Tatra banka%'::text) OR (name ~~ 'VUB%'::text) OR (name ~~ 'Prima banka%'::text)))"

--OPT
EXPLAIN
SELECT * FROM banky_point 
WHERE (name LIKE '' OR name LIKE 'ČSOB%' OR name LIKE 'Tatra banka%' OR name LIKE 'VUB%' OR name LIKE 'Prima banka%')
		
"Seq Scan on banky_point  (cost=0.00..42.47 rows=107 width=164)"
"  Filter: ((name ~~ ''::text) OR (name ~~ 'ČSOB%'::text) OR (name ~~ 'Tatra banka%'::text) OR (name ~~ 'VUB%'::text) OR (name ~~ 'Prima banka%'::text))"
------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPLAIN
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point 
	WHERE amenity LIKE 'bank'
	AND name IS NOT NULL
	AND ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042 ),4326),3857), 50*1000*1.6)

"Gather  (cost=5237.01..29853.21 rows=4 width=109)"
"  Workers Planned: 2"
"  ->  Parallel Bitmap Heap Scan on planet_osm_point  (cost=4237.01..28852.81 rows=2 width=109)"
"        Recheck Cond: (way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F5741E"
"1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A"
"86EA9B70C3C41D37C3106CB1F5741'::geometry)"
"        Filter: ((name IS NOT NULL) AND (amenity ~~ 'bank'::text) AND ('0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry &&"
"st_expand(way, '80000'::double precision)) AND _st_dwithin(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry, '80000'::double precision))"
"        ->  Bitmap Index Scan on planet_osm_point_index  (cost=0.00..4237.01 rows=132896 width=0)"
"              Index Cond: (way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F574"
"1E1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry)"

--OPT
EXPLAIN
SELECT * FROM banky_point 
	WHERE ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042 ),4326),3857), 50*1000*1.6)

"Seq Scan on banky_point  (cost=0.00..221.81 rows=15 width=164)"
"  Filter: ((way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F5741E1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37"
"C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry) AND"
"('0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry && st_expand(way, '80000'::double precision)) "
"AND _st_dwithin(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry, '80000'::double precision))"	

------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPLAIN
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, operator, amenity FROM planet_osm_point 
	WHERE (amenity LIKE 'atm' OR amenity LIKE 'bar' OR amenity LIKE 'cafe' OR amenity LIKE 'restaurant' OR amenity LIKE 'toilets') 
	AND ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042),4326),3857), 50*1000*1.6)                         

"Gather  (cost=5237.04..30557.92 rows=137 width=50)"
"  Workers Planned: 2"
"  ->  Parallel Bitmap Heap Scan on planet_osm_point  (cost=4237.04..29544.22 rows=57 width=50)"
"        Recheck Cond: (way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F5741E1A86"
"EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry)"
"        Filter: (('0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry && st_expand(way, '80000'::double precision))"
"AND ((amenity ~~ 'atm'::text) OR (amenity ~~ 'bar'::text) OR (amenity ~~ 'cafe'::text) OR (amenity ~~ 'restaurant'::text) "
"OR (amenity ~~ 'toilets'::text)) AND _st_dwithin(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry, '80000'::double precision))"
"        ->  Bitmap Index Scan on planet_osm_point_index  (cost=0.00..4237.01 rows=132896 width=0)"
"              Index Cond: (way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F5741E1A86EA9B70C3C41D37C31"
"060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry)"
	
--OPT
EXPLAIN
SELECT * FROM point_of_interest 
	WHERE ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042),4326),3857), 50*1000*1.6)       
	
"Seq Scan on point_of_interest  (cost=0.00..2087.46 rows=176 width=111)"
"  Filter: ((way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F5741E1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C"
"31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry) "
"AND ('0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry && st_expand(way, '80000'::double precision)) "
"AND _st_dwithin(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry, '80000'::double precision))"
	
------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPLAIN
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags FROM planet_osm_point 
	WHERE amenity LIKE 'bank' 
	AND (name LIKE '' OR name LIKE 'ČSOB%' OR name LIKE 'Tatra banka%'
	OR name LIKE 'VUB%' OR name LIKE 'Prima banka%')
	AND ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042),4326),3857), 50*1000*1.6) 
ORDER BY ST_Distance(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042),4326),3857)) 
LIMIT 10																																						

"Limit  (cost=30540.14..30542.72 rows=1 width=117)"
"  ->  Result  (cost=30540.14..30542.72 rows=1 width=117)"
"        ->  Sort  (cost=30540.14..30540.15 rows=1 width=117)"
"              Sort Key: (st_distance(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry))"
"              ->  Gather  (cost=5237.01..30540.13 rows=1 width=117)"
"                    Workers Planned: 2"
"                    ->  Parallel Bitmap Heap Scan on planet_osm_point  (cost=4237.01..29540.03 rows=1 width=117)"
"                          Recheck Cond: (way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F574"
"1E1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry)"
"                          Filter: ((amenity ~~ 'bank'::text) AND ('0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry &&"
"st_expand(way, '80000'::double precision)) AND ((name ~~ ''::text) OR (name ~~ 'ČSOB%'::text) OR (name ~~ 'Tatra banka%'::text) "
"OR (name ~~ 'VUB%'::text) OR (name ~~ 'Prima banka%'::text)) AND _st_dwithin(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry, '80000'::double precision))"
"                          ->  Bitmap Index Scan on planet_osm_point_index  (cost=0.00..4237.01 rows=132896 width=0)"
"                                Index Cond: (way && '0103000020110F00000100000005000000E1A86EA9B70C3C41D37C3106CB1F5741E"
"1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry)"

--OPT
EXPLAIN
SELECT * FROM banky_point 
	WHERE name LIKE '' OR name LIKE 'ČSOB%' OR name LIKE 'Tatra banka%'
	OR name LIKE 'VUB%' OR name LIKE 'Prima banka%'
	AND ST_DWITHIN(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042),4326),3857), 50*1000*1.6) 
ORDER BY ST_Distance(way, ST_TRANSFORM(ST_SETSRID(ST_MAKEPOINT(17.232055664062504, 48.21003212234042),4326),3857)) 
LIMIT 10	

"Limit  (cost=239.96..239.98 rows=10 width=172)"
"  ->  Sort  (cost=239.96..240.23 rows=107 width=172)"
"        Sort Key: (st_distance(way, '0101000020110F0000E1A86EA937453D41D37C3106EB6D5741'::geometry))"
"        ->  Seq Scan on banky_point  (cost=0.00..237.65 rows=107 width=172)"
"              Filter: ((name ~~ ''::text) OR (name ~~ 'ČSOB%'::text) OR (name ~~ 'Tatra banka%'::text) "
"OR (name ~~ 'VUB%'::text) OR ((name ~~ 'Prima banka%'::text) AND (way && '0103000020110F00000100000005000000"
"E1A86EA9B70C3C41D37C3106CB1F5741E1A86EA9B70C3C41D37C31060BBC5741E1A86EA9B77D3E41D37C31060BBC5741E1A86EA9B77D"
"3E41D37C3106CB1F5741E1A86EA9B70C3C41D37C3106CB1F5741'::geometry) AND ('0101000020110F0000E1A86EA937453D41D37C"
"3106EB6D5741'::geometry && st_expand(way, '80000'::double precision)) AND _st_dwithin(way, '0101000020110F0000"
"E1A86EA937453D41D37C3106EB6D5741'::geometry, '80000'::double precision)))"

------------------------------------------------------------------------------------------------------------------------------------------------------------
-- TODO: KRESLENIE POLYGONU ASI NECHAM NEAKTIVNE
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, way, tags FROM planet_osm_point 
	WHERE amenity LIKE 'bank' 
	AND name IS NOT NULL 
	AND (SELECT ST_Contains(ST_Polygon(ST_GeomFromText('LINESTRING( zd1  zs1, zd2 zs2, zd3 zs3, zd4 zs4, zd1 zs1)'), 4326), ST_Transform(way,4326)))
	

------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPLAIN
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, planet_osm_polygon.name, kriminalita_okresy.tc_zistene FROM planet_osm_polygon 
	INNER JOIN kriminalita_okresy ON planet_osm_polygon.name=kriminalita_okresy.okres 
	WHERE planet_osm_polygon.boundary LIKE 'administrative' 
	AND planet_osm_polygon.admin_level LIKE '8' 

"Nested Loop  (cost=1000.00..100778.97 rows=1 width=52)"
"  Join Filter: (planet_osm_polygon.name = (kriminalita_okresy.okres)::text)"
"  ->  Gather  (cost=1000.00..100773.69 rows=1 width=207)"
"        Workers Planned: 2"
"        ->  Parallel Seq Scan on planet_osm_polygon  (cost=0.00..99773.59 rows=1 width=207)"
"              Filter: ((boundary ~~ 'administrative'::text) AND (admin_level ~~ '8'::text))"
"  ->  Seq Scan on kriminalita_okresy  (cost=0.00..1.79 rows=79 width=322)"	
	
--OPT
EXPLAIN
SELECT svk_okresy.result, svk_okresy.name, kriminalita_okresy.tc_zistene FROM svk_okresy INNER JOIN kriminalita_okresy ON svk_okresy.name=kriminalita_okresy.okres

"Hash Join  (cost=2.78..5.65 rows=79 width=38)"
"  Hash Cond: (svk_okresy.name = (kriminalita_okresy.okres)::text)"
"  ->  Seq Scan on svk_okresy  (cost=0.00..1.79 rows=79 width=34)"
"  ->  Hash  (cost=1.79..1.79 rows=79 width=322)"
"        ->  Seq Scan on kriminalita_okresy  (cost=0.00..1.79 rows=79 width=322)"
	
------------------------------------------------------------------------------------------------------------------------------------------------------------
EXPLAIN			   
SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, way, tags FROM planet_osm_point
	WHERE amenity LIKE 'bank'
	AND name IS NOT NULL
	AND (SELECT ST_Contains(
		(SELECT ST_MakePolygon(ST_Boundary(ST_Transform(way,4326))) from planet_osm_polygon
			WHERE boundary LIKE 'administrative'
			AND admin_level like '8'
			AND name LIKE 'okres Žilina') 
, ST_Transform(way,4326)))

"Seq Scan on planet_osm_point  (cost=0.00..52800399013.60 rows=126 width=141)"
"  Filter: ((name IS NOT NULL) AND (amenity ~~ 'bank'::text) AND (SubPlan 2))"
"  SubPlan 2"
"    ->  Result  (cost=103273.13..103273.40 rows=1 width=1)"
"          InitPlan 1 (returns $1)"
"            ->  Gather  (cost=1000.00..103273.13 rows=1 width=32)"
"                  Workers Planned: 2"
"                  ->  Parallel Seq Scan on planet_osm_polygon  (cost=0.00..102273.03 rows=1 width=32)"
"                        Filter: ((boundary ~~ 'administrative'::text) AND (admin_level ~~ '8'::text) AND (name ~~ 'okres Žilina'::text))"

--OPT
EXPLAIN			   
SELECT * FROM banky_point WHERE
	(SELECT ST_Contains(
		(SELECT ST_MakePolygon(ST_Boundary(ST_Transform(way,4326))) FROM svk_okresy 
			WHERE svk_okresy.name LIKE 'okres Žilina') 
, ST_Transform(way,4326)))	

"Seq Scan on banky_point  (cost=0.00..1685.81 rows=366 width=164)"
"  Filter: (SubPlan 2)"
"  SubPlan 2"
"    ->  Result  (cost=2.00..2.26 rows=1 width=1)"
"          InitPlan 1 (returns $0)"
"            ->  Seq Scan on svk_okresy  (cost=0.00..2.00 rows=1 width=32)"
"                  Filter: (name ~~ 'okres Žilina'::text)"

------------------------------------------------------------------------------------------------------------------------------------------------------------


-- OPTIMALIZACIA
------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE banky_point AS (SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags, way FROM planet_osm_point 
	WHERE amenity LIKE 'bank' 
	AND name IS NOT NULL
ORDER BY name)	

create index name_point_idx ON banky_point (name);
------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE banky_polygon AS (SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, name, tags, way FROM planet_osm_polygon 
	WHERE amenity LIKE 'bank' 
	AND name IS NOT NULL
ORDER BY name)

create index name_poly_idx ON banky_polygon (name);
------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE point_of_interest AS (SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, operator, amenity, way FROM planet_osm_point 
	WHERE (amenity LIKE 'atm' OR amenity LIKE 'bar' OR amenity LIKE 'cafe' OR amenity LIKE 'restaurant' OR amenity LIKE 'toilets')
ORDER BY amenity)
	
create index amenity_poi_idx ON point_of_interest (amenity);
------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE svk_kraje AS (SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, planet_osm_polygon.name FROM planet_osm_polygon 
	WHERE planet_osm_polygon.boundary LIKE 'administrative' 
	AND planet_osm_polygon.admin_level LIKE '4'
ORDER BY name)	
------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE TABLE svk_okresy AS (SELECT ST_AsGeoJSON(ST_Transform(way, 4326)) AS result, planet_osm_polygon.name, planet_osm_polygon.way FROM planet_osm_polygon 
	WHERE planet_osm_polygon.boundary LIKE 'administrative' 
	AND planet_osm_polygon.admin_level LIKE '8'
	AND planet_osm_polygon.name LIKE 'okres%'
ORDER BY name)	

------------------------------------------------------------------------------------------------------------------------------------------------------------
-- KONSOLIDACIA DAT PRE VSETKY BANKY - ABY SA NEPOUZIVALI V QUERY FUNKCIE V PODMIENKE WHERE UPPER(unaccent(name))
UPDATE banky_point
SET name = UPPER(unaccent(name))
where UPPER(unaccent(name)) like UPPER(unaccent('ČSOB%'))