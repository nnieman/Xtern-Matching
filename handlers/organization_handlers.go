package handlers

import (
	"net/http"
	"google.golang.org/appengine"
	"encoding/json"
	"github.com/gorilla/mux"
	"strconv"
	"Xtern-Matching/models"
	"Xtern-Matching/handlers/services"
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"log"
	"strings"
	"github.com/gorilla/context"
	// "github.com/dgrijalva/jwt-go"
)

func GetOrganization(w http.ResponseWriter,r *http.Request) {
	ctx := appengine.NewContext(r)

	if id, ok := mux.Vars(r)["Id"]; ok {
		num_id, _ := strconv.ParseInt(id, 10, 64)
		company, err := services.GetCompany(ctx, num_id)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(company)
	}
	w.WriteHeader(http.StatusInternalServerError)
}

func PostOrganization(w http.ResponseWriter,r *http.Request) {
	ctx := appengine.NewContext(r)

	var companies []models.Company
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&companies); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	for _, company := range companies {
		_, err := services.NewCompany(ctx, company)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}

func AddStudent(w http.ResponseWriter,r *http.Request) {
	ctx := appengine.NewContext(r)

	// Get the student ID from the request data
	var dat map[string]interface{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&dat); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	studentId :=  int64(dat["studentId"].(float64));

	// Get the company id from the token org and call the service with it
	user := context.Get(r, "user")
    token, err := user.(*jwt.Token)
    if token.Valid {
        mapClaims := user.(*jwt.Token).Claims.(jwt.MapClaims)
        org := strings.TrimSpace(mapClaims["org"].(string))
		company_num_id, er1 := strconv.ParseInt(org, 10, 64)
		if er1 != nil {
			log.Print("ERROR PARSING STRING TO INT64")
			log.Print(er1)
		}
		_, err := services.AddStudentIdToCompanyList(ctx, company_num_id, studentId)
		if err != nil {
			log.Print(err)
			http.Error(w, err.Error(), 500)
			return
		}
		w.WriteHeader(http.StatusOK)
    } else {
        fmt.Println(err)
    }
}

func RemoveStudent(w http.ResponseWriter,r *http.Request) {
	ctx := appengine.NewContext(r)

	// Get the student ID from the request data
	var dat map[string]interface{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&dat); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	studentId :=  int64(dat["studentId"].(float64));

	// Get the company id from the token org and call the service with it
	user := context.Get(r, "user")
    token, err := user.(*jwt.Token)
    if token.Valid {
        mapClaims := user.(*jwt.Token).Claims.(jwt.MapClaims)
        org := strings.TrimSpace(mapClaims["org"].(string))
		company_num_id, er1 := strconv.ParseInt(org, 10, 64)
		if er1 != nil {
			log.Print("ERROR PARSING STRING TO INT64")
			log.Print(er1)
		}
		_, err := services.RemoveStudentIdFromCompanyList(ctx, company_num_id, studentId)
		if err != nil {
			log.Print(err)
			http.Error(w, err.Error(), 500)
			return
		}
	w.WriteHeader(http.StatusOK)
    } else {
        fmt.Println(err)
    }
}

func SwitchStudents(w http.ResponseWriter,r *http.Request) {
	ctx := appengine.NewContext(r)

	// Get the student IDs from the request data
	var dat map[string]interface{}
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&dat); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	student1Id :=  int64(dat["student1Id"].(float64));
	student2Id :=  int64(dat["student2Id"].(float64));

	// Get the company id from the token org and call the service with it
	user := context.Get(r, "user")
    token, err := user.(*jwt.Token)
    if token.Valid {
        mapClaims := user.(*jwt.Token).Claims.(jwt.MapClaims)
        org := strings.TrimSpace(mapClaims["org"].(string))
		company_num_id, er1 := strconv.ParseInt(org, 10, 64)
		if er1 != nil {
			log.Print("ERROR PARSING STRING TO INT64")
			log.Print(er1)
		}
		_, err := services.SwitchStudentIdsInCompanyList(ctx, company_num_id, student1Id, student2Id)
		if err != nil {
			log.Print(err)
			http.Error(w, err.Error(), 500)
			return
		}
		w.WriteHeader(http.StatusOK)
    } else {
        fmt.Println(err)
    }
}

func GetCurrentCompany(w http.ResponseWriter,r *http.Request) {
	ctx := appengine.NewContext(r)
	user := context.Get(r, "user")
    token, err := user.(*jwt.Token)

    if token.Valid {
        mapClaims := user.(*jwt.Token).Claims.(jwt.MapClaims)
        // log.Print(mapClaims)
        org := strings.TrimSpace(mapClaims["org"].(string))
        // log.Print(org)
		num_id, er1 := strconv.ParseInt(org, 10, 64)
		if er1 != nil {
			log.Print("ERROR PARSING STRING TO INT64")
			log.Print(er1)
		}
		// log.Print(num_id)
		company, err := services.GetCompany(ctx, num_id)
		if err != nil {
			log.Print("ERROR GETTING COMPANY")
			log.Print(err)
			http.Error(w, err.Error(), 500)
			return
		}
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(company)
    } else {
        fmt.Println(err)
    }
	w.WriteHeader(http.StatusInternalServerError)
}