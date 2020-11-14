# movies-bibit
---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.2

    $ npm --version
    5.6.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/bayuprasetyor/movies-bibit.git
    $ cd movies-bibit
    $ npm install



## Running the project
    $ npm start

## Database
create Table

      CREATE TABLE public.log_movies
      (
          id serial NOT NULL,
          created timestamp without time zone NOT NULL DEFAULT now(),
          endpoint character varying,
          parameter character varying,
          message character varying,
          response character varying,
          PRIMARY KEY (id)
      )
      WITH (
          OIDS = FALSE
      );
      ALTER TABLE public.log_movies
          OWNER to postgres;
          
setting env

      OMDBAPI=http://www.omdbapi.com/?apikey=faf7e5bb
      PG_DB_HOST=localhost
      PG_DB_USER=dbUser
      PG_DB_PASS=dbPassword
      PG_DB_NAME=dbName
      PG_DB_PORT=dbPort

## EndPoint list

### search

    EndPoint : http://localhost:3000/movies/search

    body : {
        "title":string,
        "year":string,
        "page":number,
        "type":string
    }

    result :{
        "status": true,
        "data": {
            "Search": [
                {
                    "Title": "Batman",
                    "Year": "1989",
                    "imdbID": "tt0096895",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
                },
                {
                    "Title": "Batman",
                    "Year": "1989",
                    "imdbID": "tt0206583",
                    "Type": "game",
                    "Poster": "N/A"
                },
                {
                    "Title": "Batman",
                    "Year": "1989",
                    "imdbID": "tt11568382",
                    "Type": "game",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BNjEwMGJkMDktY2FiZC00MTUzLWEwMjUtNWFkMzQzYWIxMzM0XkEyXkFqcGdeQXVyMDEyNTAwMw@@._V1_SX300.jpg"
                },
                {
                    "Title": "Batman and Robin and the Other Super Heroes",
                    "Year": "1989",
                    "imdbID": "tt2181896",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BMzMyY2YwMDctZGQ2MS00MmYwLWJlOTctYTdkNmJkNjViYjc2XkEyXkFqcGdeQXVyNDU5NjAxMTg@._V1_SX300.jpg"
                }
            ],
            "totalResults": "4",
            "Response": "True"
        }
    }
    }

### Details
    EndPoint : /movies/detail/:id
    example id : tt3645538
    result :{
    {
        "status": true,
        "data": {
            "Title": "Batman: The Creep Crusader",
            "Year": "2013",
            "Rated": "N/A",
            "Released": "12 Nov 2013",
            "Runtime": "N/A",
            "Genre": "Short, Comedy",
            "Director": "Sam Macaroni",
            "Writer": "Sam Macaroni",
            "Actors": "Lloyd Ahlquist, Bart Baker, Nathan Barnatt, Steve Greene",
            "Plot": "N/A",
            "Language": "English",
            "Country": "USA",
            "Awards": "N/A",
            "Poster": "N/A",
            "Ratings": [
                {
                    "Source": "Internet Movie Database",
                    "Value": "7.6/10"
                }
            ],
            "Metascore": "N/A",
            "imdbRating": "7.6",
            "imdbVotes": "7",
            "imdbID": "tt3645538",
            "Type": "movie",
            "DVD": "N/A",
            "BoxOffice": "N/A",
            "Production": "N/A",
            "Website": "N/A",
            "Response": "True"
        }
    }
    }
