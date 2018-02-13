# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Politica

```json
{
  "group": [segment|device|priority],
  "priority": [0-100],

  "allow_hibernate": [true|false],
  "total_hibernate": [true|false],
  "hibernate_activation": [time],
  "hibernate_wakeUp": [car_event],

  "intensity": number,
  "intensity_value": [absolute|percentual],
  "intensity_sign": [+|-],

  "enabled": [true|false],
  "rule_start": [],
  "rule_end": []
}
```

# Segment
```json
{
  "max_lumens": number,
  "min_lumens": number
}
```

# Device
```json
{
  "max_lumnes": [number|nil],
  "min_lumens": [number|nil],
  "inherit_lumens": [true|false],
  "current_lumens": [number],

  "last_event_date": [date]
}
```
