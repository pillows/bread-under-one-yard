
# bread-under-one-yard-backend
Repo name was named using the letters of the company and the BIP39 wordlist from the bitcoin protocol.

#Prequisites
NodeJS, npm, Python3, and >Django2 is necessary for this assignment to run.
These were the tested versions:
Node: v13.10.1
npm: 6.13.7
Python3: 3.7.6
Django: 2.0.2

#Install

First the repo must be cloned:
```bash
git clone https://github.com/pillows/bread-under-one-yard
git checkout real
```

First we will install and start the ReactJS frontend:
```bash
cd frontend
npm install
npm start
```

Next will be installing the Django backend
```bash
cd ../backend
pip3 install -r requirements.txt
```

The database will also have to be migrated
```bash
./manage.py migrate
./manage.py makemigrations
./manage.py convert_csv_to_db
```
The backend server can now to be run:
```bash
./manage.py runserver
```

# Running
The frontend will be hosted at http://localhost:3000 and the backend will be at http://localhost:8000
