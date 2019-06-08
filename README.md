# Seed project for e2e autotests

## Stack
Typescript - Protractor - Mocha - Selenoid

## Run autotests

First of all install dependencies:
```
npm i
```

Then run:
```
npm test
```

* By default autotests run without Selenoid and in the single thread.

### Run with Selenoid
Set `isSelenoid = true` in the **protractor.conf.ts**

For run Selenoid execute:
```
sh selenoiuUp.sh
```

For down Selenoid execute:
```
sh selenoiuDown.sh
```

### Run in the parallel mode
Set `isParallel = true` in the **protractor.conf.ts**

## Artifacts
For check autotests' artifacts look into:
    
    artifacts/logs
    artifacts/video
    
## Reporter
// TODO (allure or reportportal)

## Requirements
    nodejs >= v8.9.1
    npm >= 5.7.1

## OS

### Windows:
This project is set for windows by default.

### Linux (Unix):
Make changes in the **docker-compose.yml**. Sections: `volumes`; `environment`.
