package services

import (
	"encoding/csv"
	"mime/multipart"
	"time"

	"tujifund/backend/models"
)

func ReadCSV(file multipart.File) ([]models.User, error) {
	reader := csv.NewReader(file)

	records, err := reader.ReadAll()
	if err != nil {
		println("here1")
		return nil, err
	}

	var users []models.User

	// Iterate through the records and map them to the User struct
	for _, record := range records[1:] { // Skip the header
		// id, err := strconv.Atoi(record[0])
		if err != nil {
			println("here2")
			return nil, err
		}

		dob, err := time.Parse("2006-01-02", record[4])
		if err != nil {
			println("here3")
			return nil, err
		}

		// type role models.Role
		// if record[6] == "" {
		// 	role = models.Member // Default to "member" if role is empty
		// }

		// Create User struct from the CSV record
		user := models.User{
			Name:       record[0],
			Password:   "12345",
			NationalID: record[1],
			Email:      record[3],
			Dob:        dob,
			// Role:       role,
			Country: record[5],
			Gender:  record[6],
		}

		users = append(users, user)
	}

	return users, nil
}
