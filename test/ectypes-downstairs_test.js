var DownstairsStrategy = require('../lib/ectypes-downstairs.js');

var ectypes = require('ectypes')
  , should = require('should')
  , faker2 = require('faker2')
  , env = require('./../config/env')
  , ctx = ectypes.createContext()
  , sql = require('sql')
  , Downstairs = require('downstairs')
  , Table = Downstairs.Table
  , pg = require('pg');

var pgConnection = new Downstairs.Connection.PostgreSQL(env.connectionString);
Downstairs.add(pgConnection);
var strategy = new DownstairsStrategy(pgConnection);

ctx.load(strategy);

var userSQL = sql.Table.define({
      name: 'users'
      , quote: true
      , columns: ['id' 
        , 'username' 
        , 'created_at'
        , 'updated_at'
        , 'is_active'
        , 'email'
        , 'password'
      ]
    });

var userTableSQL = "CREATE TABLE users\
(\
  id bigserial NOT NULL,\
  username character varying(100) unique NOT NULL,\
  created_at timestamp with time zone NOT NULL DEFAULT now(),\
  updated_at timestamp with time zone NOT NULL DEFAULT now(),\
  email character varying(512) unique,\
  password character varying(512),  \
  CONSTRAINT pk_users PRIMARY KEY (id)\
);"

var blueprint =
  {User: { 
    email: function(){ return faker2.Internet.email()} 
    , password: function(){ return "5f4dcc3b5aa765d61d8327deb882cf99"}
    , username: function(){ return faker2.Internet.userName()}
    , 
  }
}

ctx.add(blueprint);

describe('downstairs ectypes', function(done){
  beforeEach(function(done){
    pg.connect(env.connectionString, function(err, client) {
      var resetString = "drop schema public cascade; create schema public;" + userTableSql;
      client.query(resetString, function(err, result){
        done()
      });
   });

    it('should create an ectype User!', function(done){
      ctx.User.create(function(err, user){
        should.exist(user);
        user.password.should.equal('5f4dcc3b5aa765d61d8327deb882cf99');
        should.exist(user.email);
        should.exist(user.username);
        done();
      })
    });
  });
})
