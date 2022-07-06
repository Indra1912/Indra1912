using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using letsvote.DataAccess;
using letsvote.Models;

namespace letsvote.Controllers
{
    [RoutePrefix("api/voter")]
    public class UserController : ApiController
    {
        voteEntities db = new voteEntities();
        [HttpPost]
        [Route("register")]
        public IHttpActionResult registerUser([FromBody] UserModel voter)
        {
            voter voter_db = db.voters.Where(u => u.voter_id == voter.voter_id).FirstOrDefault();
            if (voter_db != null)
            {
                return BadRequest("This Username Already Exists");
            }
            else
            {
                voter_db = new voter
                {
                    name = voter.name,
                    password = voter.password,
                    birthdate = voter.birthdate,
                    voter_id = voter.voter_id,
                    mobile = voter.mobile,
                    address = voter.address
                };
                db.voters.Add(voter_db);
                db.SaveChanges();
                return Ok("Successfully registered for voting");
            }
           
        }
        [HttpPost]
        [Route("login")]
        public IHttpActionResult login([FromBody] UserModel voter)
        {
            voter voter_db = db.voters.Where(u => u.voter_id == voter.voter_id).FirstOrDefault();
            if(voter_db == null)
            {
                return Ok("You are not registered to vote");
            }

            else
            {
                if(voter_db.password.Equals(voter.password))
                {
                    //voter.voter_id = voter_db.voter_id;
                    //voter.name = voter_db.name;
                    //voter.password = "*****";
                    //voter.birthdate = voter_db.birthdate;
                    //voter.address = voter_db.address;
                    //voter.mobile = voter_db.mobile;

                    return Ok("Logged in Successfully");
                }
                else
                {
                    return Ok("username or password is incorrect");
                }

            }
           
        }
        
    }
}
