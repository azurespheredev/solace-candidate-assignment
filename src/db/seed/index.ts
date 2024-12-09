import { db } from "..";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

const seedAdvocates = async () => {
    try {
        console.log("Starting seed process...");

        for (const advocate of advocateData) {
            await db.insert(advocates).values({
                firstName: advocate.firstName,
                lastName: advocate.lastName,
                city: advocate.city,
                degree: advocate.degree,
                specialties: advocate.specialties,
                yearsOfExperience: advocate.yearsOfExperience,
                phoneNumber: advocate.phoneNumber,
            });
        }

        console.log("Seeding completed!");
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Seeding process finished.");
        process.exit(1);
    }
};

seedAdvocates();
