let port = 8000,
    dbUrl = 'mongodb://DBO:1malPasswort@ds125198.mlab.com:25198/auth_db',
    saltRounds = 10,
    signingSecret =
        '5|=]`J6@cLBjHDG)XXS0+X:}lZaeBJV^;f.7#;Pa3K4fC`+}$*:9PK&E/Nu)qmP';

export { port, dbUrl, saltRounds, signingSecret };
