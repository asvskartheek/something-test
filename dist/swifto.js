// async function to make the /new_visit API call
const swiftoId = window.SWIFTO_ID;
async function fetchNewVisit() {

    try {
        const response = await fetch(`https://crazyculturedaccess.kartheekakella.repl.co/new_visit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ swifto_id: swiftoId })
        });

        if (!response.ok) {
            throw new Error(`New Visit API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Loop through the response data and replace text
        data.forEach(item => {
            const regex = new RegExp(item.original, 'g');
            document.body.innerHTML = document.body.innerHTML.replace(regex, item.variant);
        });

        // Set a timeout to call the /engaged API after 10 seconds
        setTimeout(() => {
            fetchEngaged(swiftoId, data);
        }, 10000);
    } catch (error) {
        console.error('Error:', error);
    }
}

// async function to make the /engaged API call
async function fetchEngaged(swiftoId, textAndVariantIdList) {
    try {
        const requestBody = {
            swifto_id: swiftoId,
            text_and_variant_id: textAndVariantIdList
        };

        const response = await fetch('https://crazyculturedaccess.kartheekakella.repl.co/engaged', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Engaged API request failed with status: ${response.status}`);
        }

        console.log('Engaged successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Start the process when the page loads
window.onload = () => {
    fetchNewVisit();
};
