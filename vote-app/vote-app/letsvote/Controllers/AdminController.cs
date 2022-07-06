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
    [RoutePrefix("api/admin")]
    public class AdminController : ApiController
    {
        voteEntities db = new voteEntities();
        [HttpPost]
        [Route("login")]
        public IHttpActionResult AdminLogin([FromBody] AdminModel admin)
        {
            AdminRecord admin_db = db.AdminRecords.Where(a => a.Admin_id == admin.Admin_id).FirstOrDefault();
            if (admin_db != null && (admin_db.password.Equals(admin.password)))
            {
                               
                return Ok ("Welcome Admin");                
             }
            else
            {
                return Ok("You are not an admin");
            }
            
        }
        [HttpGet]
        [Route("getallvoters")]
        public IHttpActionResult getAllVoters()
        {
            List<voter> voters = db.voters.ToList();
            return Ok(voters);
        }

        [HttpGet]
        [Route("voterbyid/{id:int}")]
        public IHttpActionResult GetCandidates(int id)
        {
            voter voter = db.voters.Where(v => v.voter_id == id).FirstOrDefault();

            return Ok(voter);
        }

        [HttpPost]
        [Route("addcandidate")]
        
      public IHttpActionResult candidateinsert(Candidate c)
        {
            try
            {
                
                db.Candidates.Add(c);
                db.SaveChanges();
               
                return Ok("Successfully added");
            }
            catch
            {
                return Ok("failed to insert ");
            }
        }
        [HttpPost]
        [Route("addvoter")]
        public IHttpActionResult voterinsert(voter v)
        {
            try
            {

                db.voters.Add(v);
                db.SaveChanges();

                return Ok("Successfully added");
            }
            catch
            {
                return Ok("failed to insert ");
            }
        }
        [HttpPut]
        [Route("editcandidate")]
        public IHttpActionResult Candidateedit(Candidate c)
        {

                Candidate candidate = db.Candidates.Where(p => p.Party_id == c.Party_id).FirstOrDefault();
                //c.Party_id = id;
                if (candidate != null)
                {
                    //candidate.Party_id = c.Party_id;
                    candidate.partyname = c.partyname;
                    candidate.candidatename = c.candidatename;
                    db.SaveChanges();
                    return Ok("Candidate details updated");
                }
                else
                    return BadRequest("Failed to Update");
                
            }

        [HttpPut]
        [Route("editvoter")]
        public IHttpActionResult Voteredit(voter v)
        {

           voter voter = db.voters.Where(p => p.voter_id == v.voter_id).FirstOrDefault();
            //c.Party_id = id;
            if (voter != null)
            {
                voter.name = v.name;
                voter.mobile = v.mobile;
                voter.birthdate = v.birthdate;
                voter.address = v.address;
                voter.password = v.password;
                
                db.SaveChanges();
                return Ok("Voter details updated");
            }
            else
                return BadRequest("Failed to Update");

        }


        [HttpDelete]
        [Route("cdel/{id:int}")]
        public IHttpActionResult candidatedel(int id)
        {
            try
            {

                Candidate candidate = db.Candidates.Where(p => p.Party_id == id).FirstOrDefault();
                db.Candidates.Remove(candidate);
                db.SaveChanges();
                return Ok("Successfully deleted");
            }
            catch
            {
                return Ok("failed to delete ");
            }
        }
        [HttpDelete]
        [Route("vdel/{id:int}")]
        public IHttpActionResult voterdel(int id)
        {
            try
            {

                voter voter = db.voters.Where(p => p.voter_id == id).FirstOrDefault();
                db.voters.Remove(voter);
                db.SaveChanges();
                return Ok("Successfully deleted");
            }
            catch
            {
                return Ok("failed to delete ");
            }
        }

    }
}
