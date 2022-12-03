const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
    console.log("Inicio Passport");

    const authenticateUser = (persona_apellidopat, persona_curp, done) => {
        console.log(persona_apellidopat, persona_curp);
        pool.query(
            `SELECT * FROM schema1.persona WHERE persona_apellidopat = $1`, [persona_apellidopat],
            (err, results) => {
                if (err) {
                    throw err;
                }

                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(persona_curp, user.persona_curp, (err, isMatch) => {
                        if (err) {
                            console.log(err);
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "El CURP no corresponde a una persona dentro del estado" });
                        }
                    });
                } else {
                    // No user
                    return done(null, false, {
                        message: "No se tienen usuarios registrados con ese apellido"
                    });
                }
            }
        );
    };

    passport.use(
        new LocalStrategy({ usernameField: "persona_apellidopat", passwordField: "persona_curp" },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user.persona_id));

    passport.deserializeUser((persona_id, done) => {
        pool.query(`SELECT * FROM schema1.persona WHERE persona_id = $1`, [persona_id], (err, results) => {
            if (err) {
                return done(err);
            }
            console.log(`ID is ${results.rows[0].persona_id}`);
            return done(null, results.rows[0]);
        });
    });
}

module.exports = initialize;