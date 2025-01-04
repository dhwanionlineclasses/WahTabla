"use server"


const base_url = process.env.BACKEND_URL!


export const createStripeCheckoutSession = async(courseName: string, module: string, amount: number) => {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: courseName,
          amount: amount,
          metadata: {
            course: courseName,
            year: module
          }
        }),
    };

    try {
        const response = await fetch(`${base_url}/createCheckout`, options)
        const data = await response.json()

        if (response.status === 200 && data.url) {

            return {
                success: true,
                message: 'Successfuly checkout session created',
                url: data.url,
            }

        } else {
            return { success: false, message: data.message || 'Checkout failed' }
        }

    } catch (error) {
        console.error('Login Error:', error)
        // Use a type guard to check if error is an instance of Error
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

        return { success: false, message: errorMessage }
    }
}