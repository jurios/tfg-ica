# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
SegmentType.delete_all
Segment.delete_all
Device.delete_all
Rule.delete_all

@a = SegmentType.create(name: 'Alta velocitat', velocity_min: 61)
@a1a = SegmentType.create(
  name: 'Carreteres de calçades separades amb encreuaments a diferent nivell i accessos controlats (autopistes i autovies)',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 25000',
      parent_type: @a1a,
      velocity_min: @a1a.velocity_min,
      velocity_max: @a1a.velocity_max
    },
    {
      name: '15000 =< IMD < 25000',
      parent_type: @a1a,
      velocity_min: @a1a.velocity_min,
      velocity_max: @a1a.velocity_max
    },
    {
      name: 'IMD < 15000',
      parent_type: @a1a,
      velocity_min: @a1a.velocity_min,
      velocity_max: @a1a.velocity_max
    }
  ]
)

@a1b = SegmentType.create(
  name: 'Carreteres de calçada única amb doble sentit de circulació i accessos limitats (vies ràpides)',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 15000',
      parent_type: @a1b,
      velocity_min: @a1b.velocity_min,
      velocity_max: @a1b.velocity_max
    },
    {
      name: 'IMD < 15000',
      parent_type: @a1b,
      velocity_min: @a1b.velocity_min,
      velocity_max: @a1b.velocity_max
    }
  ]
)

@a2a = SegmentType.create(
  name: 'Carreteres interurbanes sense separació de voreres o carrils bici',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 7000',
      parent_type: @a2a,
      velocity_min: @a2a.velocity_min,
      velocity_max: @a2a.velocity_max
    },
    {
      name: 'IMD < 7000',
      parent_type: @a2a,
      velocity_min: @a2a.velocity_min,
      velocity_max: @a2a.velocity_max
    }
  ]
)

@a2b = SegmentType.create(
  name: 'Carreteres locals  en zones rurals sense via de servei',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 7000',
      parent_type: @a2b,
      velocity_min: @a2b.velocity_min,
      velocity_max: @a2b.velocity_max
    },
    {
      name: 'IMD < 7000',
      parent_type: @a2b,
      velocity_min: @a2b.velocity_min,
      velocity_max: @a2b.velocity_max
    }
  ]
)

@a3a = SegmentType.create(
  name: 'Vies col·lectores i rondes de circumval·lació',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 25000',
      parent_type: @a3a,
      velocity_min: @a3a.velocity_min,
      velocity_max: @a3a.velocity_max
    },
    {
      name: '15000 =< IMD < 25000',
      parent_type: @a3a,
      velocity_min: @a3a.velocity_min,
      velocity_max: @a3a.velocity_max
    },
    {
      name: '7000 =< IMD < 15000',
      parent_type: @a3a,
      velocity_min: @a3a.velocity_min,
      velocity_max: @a3a.velocity_max
    },
    {
      name: 'IMD < 7000',
      parent_type: @a3a,
      velocity_min: @a3a.velocity_min,
      velocity_max: @a3a.velocity_max
    },
  ]
)

@a3b = SegmentType.create(
  name: 'Carreteres interurbanes amb accessos no restringits.',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 25000',
      parent_type: @a3b,
      velocity_min: @a3b.velocity_min,
      velocity_max: @a3b.velocity_max
    },
    {
      name: '15000 =< IMD < 25000',
      parent_type: @a3b,
      velocity_min: @a3b.velocity_min,
      velocity_max: @a3b.velocity_max
    },
    {
      name: '7000 =< IMD < 15000',
      parent_type: @a3b,
      velocity_min: @a3b.velocity_min,
      velocity_max: @a3b.velocity_max
    },
    {
      name: 'IMD < 7000',
      parent_type: @a3b,
      velocity_min: @a3b.velocity_min,
      velocity_max: @a3b.velocity_max
    },
  ]
)

@a3c = SegmentType.create(
  name: 'Vies urbanes de trànsit important, ràpides radials i de distribució urbana a districtes',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 25000',
      parent_type: @a3c,
      velocity_min: @a3c.velocity_min,
      velocity_max: @a3c.velocity_max
    },
    {
      name: '15000 =< IMD < 25000',
      parent_type: @a3c,
      velocity_min: @a3c.velocity_min,
      velocity_max: @a3c.velocity_max
    },
    {
      name: '7000 =< IMD < 15000',
      parent_type: @a3c,
      velocity_min: @a3c.velocity_min,
      velocity_max: @a3c.velocity_max
    },
    {
      name: 'IMD < 7000',
      parent_type: @a3c,
      velocity_min: @a3c.velocity_min,
      velocity_max: @a3c.velocity_max
    },
  ]
)

@a3d = SegmentType.create(
  name: 'Vies principals de la ciutat i travessia de poblacions.',
  parent_type: @a,
  velocity_min: @a.velocity_min,
  velocity_max: @a.velocity_max
)
SegmentType.create(
  [
    {
      name: 'IMD >= 25000',
      parent_type: @a3d,
      velocity_min: @a3d.velocity_min,
      velocity_max: @a3d.velocity_max
    },
    {
      name: '15000 =< IMD < 25000',
      parent_type: @a3d,
      velocity_min: @a3d.velocity_min,
      velocity_max: @a3d.velocity_max
    },
    {
      name: '7000 =< IMD < 15000',
      parent_type: @a3d,
      velocity_min: @a3d.velocity_min,
      velocity_max: @a3d.velocity_max
    },
    {
      name: 'IMD < 7000',
      parent_type: @a3d,
      velocity_min: @a3d.velocity_min,
      velocity_max: @a3d.velocity_max
    },
  ]
)

@b = SegmentType.create(name: 'Velocitat Moderada', velocity_max: 60, velocity_min: 31)
@c = SegmentType.create(name: 'Carril Bici')
@d = SegmentType.create(name: 'Baixa Velocitat', velocity_max: 30, velocity_min: 6)
@e = SegmentType.create(name: 'Via de vianants', velocity_max: 5)

Segment.create(id: 1, segment_id: "UPV - Parking Informatica", max_lumens: nil, min_lumens: nil, segment_type_id: 3)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 100.0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 20,
  start_rule_minutes: 0,
  end_rule_hours: 20,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: 1,
  device_id: nil
)
Segment.create(id: 2, segment_id: "UPV - Aparellada - Portell", max_lumens: nil, min_lumens: nil, segment_type_id: 3)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 100.0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 20,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: 2,
  device_id: nil
)
# SEGMENT PARKING
Device.create(id: 1, serial_id: "77g7e40gr4", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34986332058906555, latitude: 39.48175483087742, address: "Camí de Vera, 15B, 46020 València, Valencia, Spain", intensity: 0.0, segment_id: 1)
Device.create(id: 2, serial_id: "d3dvz8h2rk", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3497493267059326, latitude: 39.48177967332371, address: "Camí de Vera, 15B, 46020 València, Valencia, Spain", intensity: 0.0, segment_id: 1)
Device.create(id: 3, serial_id: "g8gvicy3ps", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34967824816703796, latitude: 39.48163786438896, address: "Av. dels Tarongers, 2, 46022 València, Valencia, S...", intensity: 0.0, segment_id: 1)
Device.create(id: 4, serial_id: "2xqmxtdqlc", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3495830297470093, latitude: 39.48175379577661, address: "Camí de Vera, 15B, 46020 València, Valencia, Spain", intensity: 0.0, segment_id: 1)
Device.create(id: 5, serial_id: "pbp6hs91o0", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34944891929626465, latitude: 39.48187490246628, address: "Camí de Vera, 15B, 46020 València, Valencia, Spain", intensity: 0.0, segment_id: 1)
Device.create(id: 6, serial_id: "mkcyo4kec0", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3495454788208008, latitude: 39.481687549293056, address: "Av. dels Tarongers, 2, 46022 València, Valencia, S...", intensity: 0.0, segment_id: 1)
Device.create(id: 7, serial_id: "kmqrehcua8 - bus", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.35016104578971863, latitude: 39.481861446177824, address: "Camí de Vera, 15B, 46020 València, Valencia, Spain", intensity: 0.0, segment_id: 1)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 100.0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 20,
  start_rule_minutes: 0,
  end_rule_hours: 02,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 7
)
Device.create(id: 8, serial_id: "1cix7bkuxc - bus", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3499290347099304, latitude: 39.48205190417178, address: "Camí de Vera, 15B, 46020 València, Valencia, Spain", intensity: 0.0, segment_id: 1)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 100.0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 20,
  start_rule_minutes: 0,
  end_rule_hours: 02,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 8
)

# SEGMENT CARRER APARELLAT
Device.create(id: 17, serial_id: "9rhlnxftrk", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3468109667301178, latitude: 39.48101680009322, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Device.create(id: 18, serial_id: "tuilsmdzv4", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34689411520957947, latitude: 39.4810323267682, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 21,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 18
)
Device.create(id: 19, serial_id: "fi3znavukg", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3467506170272827, latitude: 39.48114204850595, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Device.create(id: 20, serial_id: "a5x8lvxocw", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34684717655181885, latitude: 39.4811565400433, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 21,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 19
)
Device.create(id: 21, serial_id: "bl6nf7rs28", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34666478633880615, latitude: 39.48132319250557, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Device.create(id: 22, serial_id: "s67usx0pog", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34675195813179016, latitude: 39.481343894646905, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Rule.create(
  preference: true,
  priority: 25,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 21,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 22
)
Device.create(id: 25, serial_id: "mg92qewdy8", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3466138243675232, latitude: 39.48142773828791, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Device.create(id: 26, serial_id: "ppc5ku56mo", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34669429063796997, latitude: 39.48145920545514, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Rule.create(
  preference: false,
  priority: 1,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 0,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 21,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 25
)
Device.create(id: 27, serial_id: "3yd7ktymsg - pas de vianants", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.34669965505599976, latitude: 39.481262535189636, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Rule.create(
  preference: true,
  priority: 25,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 100,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 21,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 27
)
Device.create(id: 28, serial_id: "6q5c1rnfkg - pas de vianants", max_lumens: nil, min_lumens: nil, lumens: nil, inherit_lumens: true, longitude: -0.3467854857444763, latitude: 39.48128530756463, address: "Passeig Federico Mayor Zaragoza, 46022 València, V...", intensity: 0.0, segment_id: 2)
Rule.create(
  preference: true,
  priority: 25,
  inherit_hibernate: false,
  allow_hibernate: true,
  total_hibernate: false,
  delay_hibernate: 15000,
  inherit_intensity: false,
  intensity: 100,
  intensity_value: "absolute",
  intensity_sign: "+",
  inherit_schedule: false,
  start_rule_hours: 21,
  start_rule_minutes: 00,
  end_rule_hours: 06,
  end_rule_minutes: 59,
  inherit_weather: true,
  raining: false,
  fog: false,
  enabled: true,
  segment_id: nil,
  device_id: 28
)
